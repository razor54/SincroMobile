package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface VehicleRepository: CrudRepository<Vehicle, String> {

    fun findByOwnerId(id:Int) : Optional<Vehicle>
}