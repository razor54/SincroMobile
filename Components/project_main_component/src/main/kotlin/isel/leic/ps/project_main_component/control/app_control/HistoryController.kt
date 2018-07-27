package isel.leic.ps.project_main_component.control.app_control

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.service.EventService
import isel.leic.ps.project_main_component.service.HistoryService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class HistoryController {

    @Autowired
    lateinit var historyService: HistoryService

    @GetMapping("/history")
    fun getHistory(@RequestBody user: User) = historyService.getHistoryForUser(user.id)

    //@PostMapping("/history/elem")
    //fun addElemToHistory(@RequestBody event: Event) = eventService.updateEvent(event)
}
