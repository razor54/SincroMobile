package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.domain.model.DelegateRequest
import isel.leic.ps.project_main_component.domain.model.DelegateResponse
import isel.leic.ps.project_main_component.domain.model.DelegatedVehicle
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/vehicles")
class VehicleController{

    @Autowired
    lateinit var vehicleService: VehicleService

    @Autowired
    lateinit var userService: UserService

    @PostMapping("subscription/{vehicleId}")
    fun subscribeVehicle(userId:Int, @PathVariable("vehicleId") vehicleId:String ){
        vehicleService.subscribeVehicle(userId,vehicleId)
    }

    @GetMapping("/{userId}")
    fun getUserVehicles(@PathVariable("userId")userId:Int): List<Vehicle> {
        var user =userService.getUser(userId)
        // TODO user has in its properties the vehicles and events associated
        return vehicleService.getUserVehicles(userId)
    }

    @PostMapping("/delegate")
    fun delegatePlate(@RequestBody request: DelegateRequest){

        var userBorrow = userService.getUser(request.userBorrowId)

        var vehicle = vehicleService.getVehicle(request.plate)

        var owner = userService.getUser(request.ownerId)


        NotificationHandler.vehicleBorrowNotification(userBorrow)

        vehicleService.plateDelegation(request)
    }

    @PostMapping("/delegate/response")
    fun handleDelegation(@RequestBody delegateResponse: DelegateResponse){

        var vehicle = vehicleService.getVehicle(delegateResponse.plate)

        var userBorrowing = userService.getUser(delegateResponse.userBorrowId)

        if(!delegateResponse.accept){

           return
        }

        //vehicleService.plateDelegation(owner,user,vehicle)

    }

    @GetMapping("/subscribed")
    fun getSubscribedVehicles(){

    }

    @GetMapping("/borrowing/{borrowId}")
    fun getBorrowingVehicles(@PathVariable("borrowId") borrowId: Int): List<DelegatedVehicle> {

        var owner = userService.getUser(borrowId) // checks if user exists in data base

        return vehicleService.borrowingVehicles(borrowId); //returns borrowing vehicles
    }

    @GetMapping("/delegated/{userId}")
    fun getDelegatedVehicles(@PathVariable("userId") userId: Int): List<Vehicle> {

        var owner = userService.getUser(userId) // checks if user exists in data base

        return vehicleService.delegatedVehicles(userId); //returns delegated vehicles
    }


}