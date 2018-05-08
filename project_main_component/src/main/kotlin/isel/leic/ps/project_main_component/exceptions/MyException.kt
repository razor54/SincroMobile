package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

//error object
abstract class MyException : Exception() {

    abstract fun error(): HttpStatus

    abstract fun type(): String

    abstract fun title(): String


}
