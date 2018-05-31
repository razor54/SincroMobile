package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class NoSuchTokenException : MyException() {

    override val message: String
        get() = "There was an error retrieving token"

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "invalid-token"


    override fun title() = "Invalid token"


}
