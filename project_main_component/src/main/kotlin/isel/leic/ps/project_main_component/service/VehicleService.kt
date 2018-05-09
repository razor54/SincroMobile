package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.UserRepository
import isel.leic.ps.project_main_component.repository.VehicleRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service


@Service
class VehicleService {
    @Autowired
    lateinit var vehicleRepository: VehicleRepository

    fun addVehicle(vehicle: Vehicle): Vehicle {
        try {
            val save = vehicleRepository.save(vehicle)
            return save
        } catch (e: Exception) {
            throw FailedToAddUserException()
        }
    }

    fun getVehicle(id: Int): Vehicle {

        val vehicle = vehicleRepository.findById(id)
        if (vehicle.isPresent) return vehicle.get()
        throw NoSuchUserException()

    }

    fun removeUser(id: Int) {
        try {
            vehicleRepository.deleteById(id)
        } catch (e: Exception) {
            throw NoSuchUserException()
        }
    }
}