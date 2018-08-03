package isel.leic.ps.project_main_component.control.app_control

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.History
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.NoPermissionException
import isel.leic.ps.project_main_component.service.EventService
import isel.leic.ps.project_main_component.service.HistoryService
import isel.leic.ps.project_main_component.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class HistoryController {

    @Autowired
    lateinit var historyService: HistoryService

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/history")
    fun getHistory(auth: String) =
            historyService.getHistoryForUser(userService.getUserAuth(auth).id)

    //@PostMapping("/history/elem")
    //fun addElemToHistory(@RequestBody event: Event) = eventService.updateEvent(event)

}
