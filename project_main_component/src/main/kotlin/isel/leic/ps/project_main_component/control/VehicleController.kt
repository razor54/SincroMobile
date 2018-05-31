package isel.leic.ps.project_main_component.control

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

    @PostMapping("/delegate/")
    fun delegatePlate(@RequestParam("plate")plate:String, @RequestParam("owner_id")owner_id:Int,
                      @RequestParam("other_user_id") other_user_id:Int){

        var vehicle = vehicleService.getVehicle(plate)

        var owner = userService.getUser(owner_id)

        var user = userService.getUser(other_user_id)

        NotificationHandler.vehicleBorrowNotification(user)




    }

    @PostMapping("/delegate/response")
    fun handleDelegation(@RequestParam("plate")plate:String, @RequestParam("owner_id")owner_id:Int,
                         @RequestParam("other_user_id") other_user_id:Int, @RequestParam("accept")accept:Boolean){
        var vehicle = vehicleService.getVehicle(plate)

        var owner = userService.getUser(owner_id)

        var user = userService.getUser(other_user_id)

        if(!accept){

           return
        }

        vehicleService.plateDelegation(user,vehicle)




    }

    @GetMapping("/subscribed")
    fun getSubscribedVehicles(){

    }

    @GetMapping("/borrowed")
    fun getBorrowedVehicles(){

    }


}