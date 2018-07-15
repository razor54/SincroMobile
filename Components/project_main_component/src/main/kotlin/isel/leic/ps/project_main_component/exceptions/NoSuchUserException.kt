package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class NoSuchUserException : MyException() {

    override val message: String
        get() = "The requested user doesn't exist in the database "

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "invalid-user-id"


    override fun title() = "Invalid user ID"


}
