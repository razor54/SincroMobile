package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.service.EventService
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.omg.CORBA.Object
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.concurrent.atomic.AtomicLong

@RestController
class EventController {

    @Autowired
    lateinit var eventService: EventService

    @Autowired
    lateinit var vehicleService: VehicleService

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/")
    fun getHomePage(): String {
        return "ola"
    }

    @PostMapping("/event")
    fun addEvent(@RequestBody event:Event) = eventService.addEvent(event)

    @PostMapping("/vehicle")
    fun addVehicle(@RequestBody vehicle: Vehicle) = vehicleService.addVehicle(vehicle)

    @PostMapping("/user")
    fun addUser(@RequestBody user: User) = userService.addUser(user)

    @GetMapping("/user/{email}")
    fun getUserByEmail(@PathVariable("email") email:String) = userService.getUser(email)

    @PostMapping("/user/event")
    fun getEvent(@RequestBody user:User) = eventService.getUserEvents(user.id)

}
