package isel.leic.ps.project_main_component.control

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import isel.leic.ps.project_main_component.domain.model.Token
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.resource.AuthenticatedUser
import isel.leic.ps.project_main_component.exceptions.CouldNotResolveTokenException
import isel.leic.ps.project_main_component.exceptions.InvalidCredentialsException
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.service.UserService
import org.json.JSONObject
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.web.bind.annotation.*
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection


@RestController
class AuthController {

    var logger: Logger = LoggerFactory.getLogger(AuthController::class.simpleName)

    @Autowired
    lateinit var userService: UserService

    @GetMapping("/validate")
    fun validateToken(@RequestHeader("authorization")authorization:String):User{
        return userService.getUserAuth(authorization)
    }

    @PostMapping("/register")
    fun createNewUser(@RequestBody user: User): AuthenticatedUser {
        val addUser = userService.addUser(user)

        //val token =
        return resolveAuthToken(addUser)
    }


    @PostMapping("/login")
    fun loginUser(@RequestBody user: User): AuthenticatedUser {

        var loggedUser = userService.verifyUserPassword(user.id, user.password)

        System.out.println("USER Logged")
        return resolveAuthToken(loggedUser)


    }


    private fun resolveAuthToken(user: User): AuthenticatedUser {

        try {
            val token = userService.getToken(user)

            val objectMapper = ObjectMapper()

            val tokenObj = objectMapper.readValue(token, Token::class.java)

            return AuthenticatedUser(user, tokenObj)
        } catch (e: Exception) {
            throw CouldNotResolveTokenException()
        }


    }
}