package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class InvalidDelegationException: MyException() {

    override val message: String
        get() = "The vehicle is not borrowed"

    override fun error(): HttpStatus  = HttpStatus.BAD_REQUEST

    override fun type(): String = "invalid-delegation"

    override fun title(): String = "Invalid Delegation"
}