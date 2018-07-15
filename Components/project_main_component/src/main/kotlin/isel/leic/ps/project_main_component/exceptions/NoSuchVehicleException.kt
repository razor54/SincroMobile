package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class NoSuchVehicleException : MyException() {

    override val message: String
        get() = "The requested vehicle doesn't exist in the database "

    override fun error() = HttpStatus.BAD_REQUEST


    override fun type(): String = "invalid-vehicle-id"


    override fun title() = "Invalid vehicle ID"


}
