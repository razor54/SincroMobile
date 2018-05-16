package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchVehicleException
import isel.leic.ps.project_main_component.repository.UserRepository
import isel.leic.ps.project_main_component.repository.VehicleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.regex.Pattern


@Service
class VehicleService {
    @Autowired
    lateinit var vehicleRepository: VehicleRepository

    fun addVehicle(vehicle: Vehicle): Vehicle {
        try {
            System.out.println(isMatriculaRegex(vehicle.plate))
            val save = vehicleRepository.save(vehicle)

            return save
        } catch (e: Exception) {
            throw FailedToAddUserException()
        }
    }

    fun getVehicle(id: String): Vehicle {

        val vehicle = vehicleRepository.findById(id)
        if (vehicle.isPresent) return vehicle.get()
        throw NoSuchUserException()

    }

    fun removeVehicle(id: String) {
        try {
            vehicleRepository.deleteById(id)
        } catch (e: Exception) {
            throw NoSuchUserException()
        }
    }

    fun getVehicleForUser(id: Int): Vehicle {
        val vehicle = vehicleRepository.findByOwnerId(id)
        if (vehicle.isPresent) return vehicle.get()
        throw NoSuchVehicleException()
    }

    fun subscribeVehicle(userId: Int, vehicleId: String) {

        var vehicle: Vehicle
        try {
            val vehicleOpt = vehicleRepository.findById(vehicleId)
            vehicle = vehicleOpt.get()
        } catch (e: Exception) {
            throw  NoSuchVehicleException()
        }

        try {
            vehicle.isSubscribed = true
            vehicleRepository.save(vehicle)
        } catch (e: Exception) {
            //throw operation unsuccessful
        }


    }

    fun isMatriculaRegex(matricula: String): Boolean {
        // pattern:
        // \A                                    - início da string
        //    (    \d{2}\-\d{2}\-[A-Z]{2}        - NN-NN-XX
        //      || \d{2}\-[A-Z]{2}\-\d{2}        - NN-XX-NN
        //      || [A-Z]{2}\-\d{2}\-\d{2} )      - XX-NN-NN
        //                                  \z   - fim da string
        val pattern = Pattern.compile("\\d{2}-\\d{2}-[A-Z]{2}|\\d{2}-[A-Z]{2}-\\d{2}|[A-Z]{2}-\\d{2}-\\d{2}")
        val matcher = pattern.matcher(matricula)
        return matcher.find()
    }

}