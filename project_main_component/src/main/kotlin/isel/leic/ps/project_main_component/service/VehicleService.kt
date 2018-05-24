package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchVehicleException
import isel.leic.ps.project_main_component.repository.UserRepository
import isel.leic.ps.project_main_component.repository.VehicleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.regex.Pattern
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Service
class VehicleService {
    var logger : Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    @Autowired
    lateinit var vehicleRepository: VehicleRepository
    @Autowired
    lateinit var userService: UserService

    fun addVehicle(vehicle: Vehicle): Vehicle {
        logger.debug("Started to add vehicle")

        try {
            val save = vehicleRepository.save(vehicle)
            logger.info("Method \"{}\" VehiclePlate \"{}\" ","Save Vehicle", vehicle.plate)

            return save
        } catch (e: Exception) {
            logger.warn("Method \"{}\" VehiclePlate \"{}\" ","Save Vehicle", vehicle.plate)
            throw FailedToAddUserException()
        }
    }

    fun getUserVehicles(id:Int):List<Vehicle>{
        logger.debug("Started to get user vehicle")


        if(!userService.constainsUser(id)){
            logger.warn("Method \"{}\" UserId \"{}\" ","Get User Vehicles", id)
            throw NoSuchUserException()
        }

        val vehicles: List<Vehicle> = vehicleRepository.findAllByOwnerId(id)
        logger.info("Method \"{}\" UserId \"{}\" ","Get User Vehicles", id)
        return vehicles
    }

    fun getVehicle(id: String): Vehicle {
        logger.debug("Started to get vehicle")

        val vehicle = vehicleRepository.findById(id)
        if (vehicle.isPresent) {

            logger.info("Method \"{}\" VehiclePlate \"{}\" ","Get Vehicle", id)

            return vehicle.get()
        }
        logger.warn("Method \"{}\" VehiclePlate \"{}\" ","Get Vehicle", id)

        throw NoSuchUserException()

    }

    fun removeVehicle(id: String) {
        logger.debug("Started to remove vehicle")

        try {
            vehicleRepository.deleteById(id)
            logger.info("Method \"{}\" VehiclePlate \"{}\" ","Remove Vehicle", id)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" VehiclePlate \"{}\" ","Remove Vehicle", id)

            throw NoSuchUserException()
        }
    }

    fun getVehicleForUser(id: Int): Vehicle {
        logger.debug("Started to get vehicle for user")

        val vehicle = vehicleRepository.findByOwnerId(id)

        if (vehicle.isPresent) {
            logger.info("Method \"{}\" VehiclePlate \"{}\" ","Get Vehicle For User", id)
            return vehicle.get()
        }
        logger.warn("Method \"{}\" VehiclePlate \"{}\" ","Get Vehicle For User", id)
        throw NoSuchVehicleException()
    }

    fun subscribeVehicle(userId: Int, vehicleId: String) {
        logger.debug("Started to subscribe vehicle")

        var vehicle: Vehicle
        try {
            val vehicleOpt = vehicleRepository.findById(vehicleId)

            logger.info("Method \"{}\" VehicleId \"{}\" ","Subscribe Vehicle", vehicleId)

            vehicle = vehicleOpt.get()

        } catch (e: Exception) {
            logger.warn("Method \"{}\" VehicleId \"{}\" ","Subscribe Vehicle", vehicleId)

            throw  NoSuchVehicleException()
        }

        try {
            vehicle.isSubscribed = true
            vehicleRepository.save(vehicle)

            logger.info("Method \"{}\" VehicleId \"{}\" ","Subscribe Vehicle", vehicleId)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" VehicleId \"{}\" ","Subscribe Vehicle", vehicleId)

            //throw operation unsuccessful
        }


    }

    fun isMatriculaRegex(matricula: String): Boolean {
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