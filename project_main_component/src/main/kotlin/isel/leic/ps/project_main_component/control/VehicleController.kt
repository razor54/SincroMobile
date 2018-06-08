package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.domain.model.*
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import javax.websocket.server.PathParam

@RestController
@RequestMapping("/vehicles")
class VehicleController{

    @Autowired
    lateinit var vehicleService: VehicleService

    @Autowired
    lateinit var userService: UserService



    @GetMapping("/{userId}")
    fun getUserVehicles(@PathVariable("userId")userId:Int): List<Vehicle> {
        return vehicleService.getUserVehicles(userId)
    }


    @GetMapping("/delegate/{userId}/requests")
    fun getDelegateRequests(@PathVariable("userId") userId: Int): List<DelegateRequest> {
       return vehicleService.delegatedRequests(userId)
    }

    @GetMapping("/subscribed")
    fun getSubscribedVehicles(){

    }

    @GetMapping("/borrowing/{borrowId}")
    fun getBorrowingVehicles(@PathVariable("borrowId") borrowId: Int): List<DelegatedVehicle> {

        // user validation
        userService.getUser(borrowId)

        return vehicleService.borrowingVehicles(borrowId);
    }

    @GetMapping("/delegated/{userId}")
    fun getDelegatedVehicles(@PathVariable("userId") userId: Int): List<Vehicle> {

        // user validation
        userService.getUser(userId)

        return vehicleService.delegatedVehicles(userId);
    }

    @GetMapping("/{vehicleId}/info")
    fun getVehicle(@PathVariable("vehicleId") plate: String): Vehicle {
        return vehicleService.getVehicle(plate)
    }

    @PostMapping("/{vehicleId}/unsubscribe")
    fun removeVehicle(@PathVariable("vehicleId") vehicleId: String){
        vehicleService.removeVehicle(vehicleId)
    }

    @PostMapping("subscription/{vehicleId}")
    fun subscribeVehicle(userId:Int, @PathVariable("vehicleId") vehicleId:String ){
        vehicleService.subscribeVehicle(userId,vehicleId)
    }
    @PostMapping("/delegate")
    fun delegatePlate(@RequestBody request: DelegateRequest){

        val userBorrow = userService.getUser(request.userBorrowId)

        //user validation
        userService.getUser(request.ownerId)

        vehicleService.plateDelegationRequest(request)

        NotificationHandler.vehicleBorrowNotification(userBorrow)

    }

    @PostMapping("/delegate/response")
    fun handleDelegation(@RequestBody delegateResponse: DelegateResponse){

        vehicleService.plateDelegationResponse(delegateResponse);
    }

}