package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class InvalidCredentialsException: MyException() {

    override val message: String
        get() = "The inserted credentials are not valid"

    override fun error(): HttpStatus  = HttpStatus.UNAUTHORIZED

    override fun type(): String = "invalid-credential"

    override fun title(): String = "Invalid Credential"
}