package isel.leic.ps.project_main_component.service

import com.google.gson.Gson
import com.google.gson.JsonArray
import isel.leic.ps.project_main_component.domain.model.*
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.InvalidDelegationException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchVehicleException
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.repository.DelegateRequestRepository
import isel.leic.ps.project_main_component.repository.DelegatedVehicleRepository
import isel.leic.ps.project_main_component.repository.VehicleRepository
import khttp.responses.Response
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional
import java.util.*
import java.util.regex.Pattern
import kotlin.reflect.full.defaultType

@Service
class VehicleService {
    var logger: Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    @Autowired
    private lateinit var vehicleRepository: VehicleRepository
    @Autowired
    private lateinit var userService: UserService
    @Autowired
    private lateinit var delegateRequestRepository: DelegateRequestRepository
    @Autowired
    private lateinit var delegatedVehicleRepository: DelegatedVehicleRepository

    @Autowired
    private lateinit var historyService: HistoryService

    fun addVehicle(vehicle: Vehicle): Vehicle {
        logger.debug("Started to add vehicle")

        try {
            val save = vehicleRepository.save(vehicle)
            logger.info("Method \"{}\" VehiclePlate \"{}\" ", "Save Vehicle", vehicle.plate)

            return save
        } catch (e: Exception) {
            logger.warn("Method \"{}\" VehiclePlate \"{}\" ", "Save Vehicle", vehicle.plate)
            throw FailedToAddUserException()
        }
    }

    fun getUserVehicles(id:Int): List<Vehicle> {
        logger.debug("Started to get user vehicles")


        if (!userService.containsUser(id)) {
            logger.warn("Method \"{}\" UserId \"{}\" ", "Get User Vehicles", id)
            throw NoSuchUserException()
        }

        val response : Response = khttp.get("http://localhost:9001/user/$id/vehicles")
        if(response.statusCode!=200){
            logger.warn("Method \"{}\" UserId \"{}\" ", "Get User Vehicles", id)
            throw NoSuchUserException()
        }

        val vehicles : List<Vehicle> = response.jsonArray
                .map { Gson().fromJson(it.toString(),Vehicle::class.java) }
                .map{
                    val subscribedVehicle = vehicleRepository.findById(it.plate)
                    if(subscribedVehicle.isPresent) subscribedVehicle.get()
                    else {
                        it
                    }
                }

        logger.info("Method \"{}\" UserId \"{}\" ", "Get User Vehicles", id)
        return vehicles
    }

    fun getUserSubscribedVehicles(id: Int): List<Vehicle> {
        logger.debug("Started to get user subscribed vehicles")


        if (!userService.containsUser(id)) {
            logger.warn("Method \"{}\" UserId \"{}\" ", "Get User Subscribed Vehicles", id)
            throw NoSuchUserException()
        }


        val vehicles: List<Vehicle> = vehicleRepository.findAllByOwnerId(id)
        logger.info("Method \"{}\" UserId \"{}\" ", "Get User Subscribed Vehicles", id)
        return vehicles
    }

    fun getSubscribedVehicle(id: String): Vehicle {
        logger.debug("Started to get vehicle")

        val vehicle = vehicleRepository.findById(id)
        if (vehicle.isPresent) {

            logger.info("Method \"{}\" VehiclePlate \"{}\" ", "Get Vehicle", id)

            return vehicle.get()
        }
        logger.warn("Method \"{}\" VehiclePlate \"{}\" ", "Get Vehicle", id)

        throw NoSuchVehicleException()

    }

    fun removeVehicle(id: String) {
        logger.debug("Started to remove vehicle")

        try {
            //delete requests
            val request = delegateRequestRepository.findByPlate(id)
            if (request.isPresent) delegateRequestRepository.delete(request.get())

            //delete delegations
            val delegation = delegatedVehicleRepository.findByPlate(id)
            if (delegation.isPresent) delegatedVehicleRepository.delete(delegation.get())

            //delete vehicle
            vehicleRepository.deleteById(id)
            logger.info("Method \"{}\" VehiclePlate \"{}\" ", "Remove Vehicle", id)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" VehiclePlate \"{}\" ", "Remove Vehicle", id)

            throw NoSuchUserException()
        }
    }

    //TODO transaction
    @Transactional
    fun plateDelegationRequest(request: DelegateRequest) {

        val vehicle = getSubscribedVehicle(request.plate)

        try {
            vehicle.delegateState = "Pending"

            vehicleRepository.save(vehicle)
            delegateRequestRepository.save(request)

            logger.info("Method \"{}\" VehicleId \"{}\" ", "Plate Delegate Request", vehicle.plate)

        } catch (e: Exception) {

            logger.warn("Method \"{}\" VehicleId \"{}\" ", "Plate Delegate Request", vehicle.plate)

            //throw operation unsuccessful
        }

    }

    @Transactional
    fun plateDelegationResponse(response: DelegateResponse) {


        val vehicle = getSubscribedVehicle(response.plate)

        val userBorrowing = userService.getUser(response.userBorrowId)

        try {
            if (response.accept) {

                //change vehicle state to true
                vehicle.delegateState = "True"
                vehicle.isSubscribed = true
                addVehicle(vehicle)

                //add vehicle to delegated list, plus borrowing id
                val delegatedVehicle = DelegatedVehicle()
                delegatedVehicle.userBorrowId = userBorrowing.id
                delegatedVehicle.plate = vehicle.plate
                delegatedVehicleRepository.save(delegatedVehicle)


                //Create new History Entry
                val history = History()
                history.date = Date()
                history.driverId = vehicle.ownerId
                history.state = "Delegate"

                //Save History of delegation
                historyService.addHistoryElement(history)
                

                val history2 = History()
                history2.date = Date()
                history2.state = "Borrow"
                history2.driverId = delegatedVehicle.userBorrowId

                //Save history of borrow
                historyService.addHistoryElement(history2)



            } else {
                //change vehicle state to false
                vehicle.delegateState = "False"
                addVehicle(vehicle)
            }

            //remove request
            delegateRequestRepository.deleteById(response.requestId)

            logger.info("Method \"{}\" Vehicle State \"{}\" ", "Plate Delegate Response", response.accept)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" Vehicle State \"{}\" ", "Plate Delegate Response", response.accept)
        }
    }

    fun delegatedRequests(userId: Int): List<DelegateRequest> {

        try {
            val requests = delegateRequestRepository.findAllByOwnerId(userId)

            logger.info("Method \"{}\" User Id \"{}\" ", "Get Delegate Requests", userId)

            return requests
        } catch (e: Exception) {
            //TODO explicit exception for this case

            logger.warn("Method \"{}\" User Id \"{}\" ", "Get Delegate Requests", userId)

            throw Exception()
        }
    }

    fun borrowRequests(userId: Int): List<DelegateRequest> {

        try {
            val requests = delegateRequestRepository.findAllByUserBorrowId(userId)

            logger.info("Method \"{}\" User Id \"{}\" ", "Get Borrow Requests", userId)

            return requests
        } catch (e: Exception) {
            //TODO explicit exception for this case

            logger.warn("Method \"{}\" User Id \"{}\" ", "Get Borrow Requests", userId)

            throw Exception()
        }
    }

    fun borrowingVehicles(borrowId: Int): List<DelegatedVehicle> {

        try {
            val delegatedVehicles = delegatedVehicleRepository.findAllByUserBorrowId(borrowId)

            logger.info("Method \"{}\" Borrow Id \"{}\" ", "Get Borrowing Vehicles", borrowId)

            return delegatedVehicles

        } catch (e: Exception) {

            logger.warn("Method \"{}\" Borrow Id \"{}\" ", "Get Borrowing Vehicles", borrowId)

            //TODO explicit exception for this case
            throw Exception()
        }

    }


    fun delegatedVehicles(userId: Int): List<Vehicle> {

        try {
            val vehicles = vehicleRepository.findAllByOwnerId(userId)

            return vehicles.filter { it.delegateState == "True" }
        } catch (e: Exception) {
            //TODO explicit exception for this case
            throw Exception()
        }
    }

    fun getCurrentDriverId(plate:String): Int {
        val delegatedVehicle = delegatedVehicleRepository.findByPlate(plate)
        if(delegatedVehicle.isPresent)
            return delegatedVehicle.get().userBorrowId

        else throw InvalidDelegationException()
    }


    @Transactional(rollbackFor = [(Exception::class)])
    fun cancelDelegation(vehicleId: String){

        val vehicleOpt = vehicleRepository.findById(vehicleId)
        val vehicle = vehicleOpt.get()

        vehicle.delegateState = "False"
        vehicleRepository.save(vehicle)

        val delegatedVehicle = delegatedVehicleRepository.findByPlate(vehicleId).get()

        val userBorrowId = delegatedVehicle.userBorrowId
        val user  = userService.getUser(userBorrowId)
        NotificationHandler.vehicleBorrowCancelNotification(user)

        delegatedVehicleRepository.deleteById(delegatedVehicle.id)



    }

    @Transactional(rollbackFor = [(Exception::class)])
    fun cancelDelegateRequest(vehicleId: String){

        val vehicleOpt = vehicleRepository.findById(vehicleId)
        val vehicle = vehicleOpt.get()

        vehicle.delegateState = "False"
        vehicleRepository.save(vehicle)

        val delegatedVehicle = delegateRequestRepository.findByPlate(vehicleId)

        if(!delegatedVehicle.isPresent){
            //TODO create an exception
            throw Exception()
        }

        val requestId = delegatedVehicle.get().id

        delegateRequestRepository.deleteById(requestId)



    }

    private fun isMatriculaRegex(matricula: String): Boolean {
        // pattern:
        // \A                                    - início da string
        //    (    \d{2}\-\d{2}\-[A-Z]{2}        - NN-NN-XX
        //      || \d{2}\-[A-Z]{2}\-\d{2}        - NN-XX-NN
        //      || [A-Z]{2}\-\d{2}\-\d{2} )      - XX-NN-NN
        //                                  \z   - fim da string
        val pattern = Pattern.compile("\\d{2}-\\d{2}-[A-Z]{2}|\\d{2}-[A-Z]{2}-\\d{2}|[A-Z]{2}-\\d{2}-\\d{2}")
        val matcher = pattern.matcher(matricula)
        return matcher.find()
    }

}