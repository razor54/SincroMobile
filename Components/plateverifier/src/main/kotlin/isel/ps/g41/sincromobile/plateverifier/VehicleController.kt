package isel.ps.g41.sincromobile.plateverifier;


import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VehicleController {

    @Autowired
    lateinit var vehicleService: VehicleService


    @GetMapping("/user/{id}/vehicles")
    fun getUserVehicles(@PathVariable("id")id:Int) = vehicleService.getUserVehicles(id)

}
