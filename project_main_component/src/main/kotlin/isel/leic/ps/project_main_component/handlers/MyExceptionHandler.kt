package isel.leic.ps.project_main_component.handlers

import isel.leic.ps.project_main_component.exceptions.MyException
import org.springframework.http.ResponseEntity
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler

import javax.servlet.http.HttpServletRequest
import java.io.IOException

@ControllerAdvice
class MyExceptionHandler {


    @ExceptionHandler(value = [(MyException::class)])
    internal fun handleExceptions(request: HttpServletRequest, e: MyException): ResponseEntity<ErrorModel> {

        val error = ErrorModel(e, request.requestURI)

        val header = LinkedMultiValueMap<String, String>()

        header.add("Content-Type", "application/problem+json")

        return ResponseEntity(error, header, e.error())
    }

    class ErrorModel internal constructor(e: MyException, uri: String) {

        var type: String = uri + "/" + e.type()
        var title: String = e.title()
        var status: Int = e.error().value()
        var detail: String = e.message!!


    }


}
