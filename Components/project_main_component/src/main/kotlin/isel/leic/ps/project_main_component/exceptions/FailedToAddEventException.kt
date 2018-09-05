package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class FailedToAddEventException : MyException() {

    override val message: String
        get() = "Failed to add event"

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type() = "event-not-added"


    override fun title() = "Failed to add event"


}
