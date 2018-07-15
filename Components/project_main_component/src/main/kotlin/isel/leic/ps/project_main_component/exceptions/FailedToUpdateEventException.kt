package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class FailedToUpdateEventException : MyException() {

    override val message: String
        get() = "We have found an error in our server database, please try again"

    override fun error() = HttpStatus.INTERNAL_SERVER_ERROR


    override fun type() = "event-not-updated"


    override fun title() = "Failed to update event"


}
