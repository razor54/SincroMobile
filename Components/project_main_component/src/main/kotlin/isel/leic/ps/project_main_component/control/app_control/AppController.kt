package isel.leic.ps.project_main_component.control.app_control

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.*


@RestController
class AppController(val userService: UserService) {



    @GetMapping("/")
    fun getHomePage(): String {
        return "ola"
    }



    @PostMapping("/user")
    fun addUser(@RequestBody user: User) = userService.addUser(user)

    @GetMapping("/user/{email}")
    fun getUserByEmail(@PathVariable("email") email:String) = userService.getUser(email)
}