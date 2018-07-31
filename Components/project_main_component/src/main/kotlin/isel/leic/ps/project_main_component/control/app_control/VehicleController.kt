package isel.leic.ps.project_main_component.control.app_control

import isel.leic.ps.project_main_component.domain.model.*
import isel.leic.ps.project_main_component.exceptions.NoPermissionException
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/vehicles")
class VehicleController {

    @Autowired
    lateinit var vehicleService: VehicleService

    @Autowired
    lateinit var userService: UserService


    @GetMapping("/{userId}")
    fun getUserVehicles(@PathVariable("userId") userId: Int, auth: String): List<Vehicle> {
        verifyUser(auth, userId)

        return vehicleService.getUserVehicles(userId)
    }

    @GetMapping("/subscribed/{userId}")
    fun getSubscribedVehicles(@PathVariable("userId") userId: Int, auth: String): List<Vehicle> {
        verifyUser(auth, userId)

        return vehicleService.getUserSubscribedVehicles(userId)
    }

    @GetMapping("/delegate/{userId}/requests")
    fun getDelegateRequests(@PathVariable("userId") userId: Int, auth: String): List<DelegateRequest> {
        verifyUser(auth, userId)
        return vehicleService.delegatedRequests(userId)
    }

    @GetMapping("/borrow/{userId}/requests")
    fun getBorrowRequests(@PathVariable("userId") userId: Int, auth: String): List<DelegateRequest> {
        verifyUser(auth, userId)
        return vehicleService.borrowRequests(userId)
    }



    @GetMapping("/borrowing/{borrowId}")
    fun getBorrowingVehicles(@PathVariable("borrowId") borrowId: Int, auth: String): List<DelegatedVehicle> {

        // user validation
        verifyUser(auth, borrowId)

        return vehicleService.borrowingVehicles(borrowId)
    }

    @GetMapping("/delegated/{userId}")
    fun getDelegatedVehicles(@PathVariable("userId") userId: Int, auth: String): List<Vehicle> {

        // user validation
        verifyUser(auth, userId)

        return vehicleService.delegatedVehicles(userId)
    }

    @GetMapping("/{vehicleId}/info")
    fun getVehicle(@PathVariable("vehicleId") plate: String, auth: String): Vehicle {

        val vehicle = vehicleService.getSubscribedVehicle(plate)
        var currentDriverId = vehicle.ownerId

        if (vehicle.delegateState == "True")
            currentDriverId = vehicleService.getCurrentDriverId(plate)

        try {
            verifyUser(auth, currentDriverId)
        } catch (e: Exception) {
            if (vehicle.ownerId != currentDriverId)
                verifyUser(auth, vehicle.ownerId)
        }


        return vehicle
    }

    @PostMapping("/subscribe")
    fun subscribeVehicle(@RequestBody vehicle: Vehicle) {
        vehicleService.addVehicle(vehicle)
    }

    @PostMapping("/{vehicleId}/unsubscribe")
    fun unsubscribeVehicle(@PathVariable("vehicleId") vehicleId: String, auth: String) {
        var vehicle = vehicleService.getSubscribedVehicle(vehicleId)
        verifyUser(auth, vehicle.ownerId)
        vehicleService.removeVehicle(vehicleId)
    }

    @PostMapping("/delegate")
    fun delegatePlate(@RequestBody request: DelegateRequest, auth: String) {

        val userBorrow = userService.getUser(request.userBorrowId)

        //user validation
        verifyUser(auth, request.ownerId)

        vehicleService.plateDelegationRequest(request)

        NotificationHandler.vehicleBorrowNotification(userBorrow)

    }

    @PostMapping("/delegate/response")
    fun handleDelegation(@RequestBody delegateResponse: DelegateResponse, auth: String) {
        verifyUser(auth, delegateResponse.userBorrowId)
        vehicleService.plateDelegationResponse(delegateResponse)
    }

    @PostMapping("/delegated/{vehicleId}/cancel")
    fun cancelDelegation(@PathVariable("vehicleId") vehicleId: String,auth:String){
        val vehicle = vehicleService.getSubscribedVehicle(vehicleId)
        verifyUser(auth,vehicle.ownerId)

        vehicleService.cancelDelegation(vehicleId)

    }

    @PostMapping("/delegate/{vehicleId}/request/cancel")
    fun cancelDelegationRequest(@PathVariable("vehicleId") vehicleId: String,auth:String){
        val vehicle = vehicleService.getSubscribedVehicle(vehicleId)
        verifyUser(auth,vehicle.ownerId)

        vehicleService.cancelDelegateRequest(vehicleId)

    }

    /*
     *
     *
     */

    private fun verifyUser(auth: String, userId: Int) {
        val user = userService.getUserAuth(auth)

        if (user.id != userId) {
            throw NoPermissionException()
        }
    }
}