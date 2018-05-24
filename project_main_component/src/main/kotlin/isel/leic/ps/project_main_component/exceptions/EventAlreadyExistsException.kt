package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class EventAlreadyExistsException : MyException() {

    override val message: String
        get() = "The event already exist in the database "

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "already-used-event-id"


    override fun title() = "Invalid event id"


}
