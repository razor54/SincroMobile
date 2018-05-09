package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.service.EventService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*
import java.util.concurrent.atomic.AtomicLong

@RestController
class EventController {

    @Autowired
    lateinit var eventService: EventService

    @GetMapping("/")
    fun getHomePage(): String {
        return "ola"
    }

    @PostMapping("/event")
    fun addEvent(@RequestBody event:Event) = eventService.addEvent(event);


}
