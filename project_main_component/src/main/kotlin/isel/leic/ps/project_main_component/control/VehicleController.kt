package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.service.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/vehicles")
class VehicleController{

    @Autowired
    lateinit var vehicleService: VehicleService

    @PostMapping("subsribription/{vehicleId}")
    fun subscribeVehicle(userId:Int, @PathVariable("vehicleId") vehicleId:String ){
        vehicleService.subscribeVehicle(userId,vehicleId)
    }

}