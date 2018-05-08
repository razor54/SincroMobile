package isel.leic.ps.project_main_component.control

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController

@RestController
class AuthController {

    @Autowired
    lateinit var userService: UserService

    @PostMapping("/register")
    fun createNewUser(@RequestBody user:User): User {
        val addUser = userService.addUser(user)
        System.out.println("USER ADDED")
        return addUser
    }
}