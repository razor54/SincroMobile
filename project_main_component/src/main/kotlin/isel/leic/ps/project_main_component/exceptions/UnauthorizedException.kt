package isel.leic.ps.project_main_component.exceptions


import org.springframework.http.HttpStatus

class UnauthorizedException : MyException() {

    override val message = "To have access the requested data it's necessary to be logged"

    override fun error() = HttpStatus.FORBIDDEN

    override fun type() = "not-authenticated"

    override fun title() = "Necessary authentication"


}
