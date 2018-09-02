package isel.leic.ps.project_main_component.control.app_control

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.service.EventService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class EventController(val eventService: EventService) {


    @PostMapping("/user/event")
    fun getEvent(@RequestBody user: User) = eventService.getUserEvents(user.id)

    @PutMapping("/event")
    fun updateEvent(@RequestBody event: Event) = eventService.updateEvent(event)

    @PostMapping("/event/payment")
    fun payEvent(@RequestBody event: Event) = eventService.payEvent(event)

}