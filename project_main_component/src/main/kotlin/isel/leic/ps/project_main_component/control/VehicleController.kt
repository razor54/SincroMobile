package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.domain.model.Vehicle
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

    @PostMapping("subsribription/{vehicleId}")
    fun subscribeVehicle(userId:Int, @PathVariable("vehicleId") vehicleId:String ){
        vehicleService.subscribeVehicle(userId,vehicleId)
    }

    @GetMapping("/{userId}")
    fun getUserVehicles(@PathVariable("userId")userId:Int): List<Vehicle> {
        var user =userService.getUser(userId)
        // TODO user has in its properties the vehicles and events associated
        return vehicleService.getUserVehicles(userId)
    }

}