package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class NoSuchEventException : MyException() {

    override val message: String
        get() = "The requested event doesn't exist in the database "

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "invalid-user-id"


    override fun title() = "Invalid event ID"


}
