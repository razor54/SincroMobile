package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class BorrowToSameUserException : MyException() {

    override val message: String
        get() = "Trying to borrow a vehicle to yourself"

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "same-user-borrow-error"


    override fun title() = "Same User Borrow Error"


}