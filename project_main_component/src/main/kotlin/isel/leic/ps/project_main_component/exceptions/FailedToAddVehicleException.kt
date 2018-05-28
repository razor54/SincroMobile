package isel.leic.ps.project_main_component.exceptions

import org.springframework.http.HttpStatus

class FailedToAddVehicleException : MyException() {

    override val message: String
        get() = "We have found an error in our server database, please try again"

    override fun error() = HttpStatus.INTERNAL_SERVER_ERROR


    override fun type() = "vehicle-not-added"


    override fun title() = "Failed to add vehicle"


}