package isel.leic.ps.project_main_component.exceptions


import org.springframework.http.HttpStatus

class CouldNotResolveTokenException : MyException() {

    override val message: String
        get() = "The access token could not be retrieved "

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "access-token-retrieve-error"


    override fun title() = "Token not resolved"


}