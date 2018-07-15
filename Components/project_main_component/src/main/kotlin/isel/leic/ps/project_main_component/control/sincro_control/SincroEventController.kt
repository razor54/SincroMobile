package isel.leic.ps.project_main_component.control.sincro_control

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.service.EventService
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("api/sincro")
class SincroEventController {

    @Autowired
    lateinit var eventService: EventService


    @PostMapping("/event")
    fun addEvent(@RequestBody event:Event) = eventService.addEvent(event)

    @PutMapping("/event")
    fun updateEvent(@RequestBody event:Event) = eventService.updateEvent(event)
}
