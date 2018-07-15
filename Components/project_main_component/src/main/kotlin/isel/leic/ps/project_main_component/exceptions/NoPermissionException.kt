package isel.leic.ps.project_main_component.exceptions


import org.springframework.http.HttpStatus

class NoPermissionException: MyException() {

    override val message: String
        get() = "No access to other user information"

    override fun error(): HttpStatus  = HttpStatus.FORBIDDEN

    override fun type(): String = "invalid-access"

    override fun title(): String = "Invalid Access"
}