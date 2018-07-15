package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.DelegateRequest
import isel.leic.ps.project_main_component.domain.model.DelegatedVehicle
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface DelegatedVehicleRepository: CrudRepository<DelegatedVehicle, Int>  {

    fun findAllByUserBorrowId(id:Int): List<DelegatedVehicle>
    fun findByPlate(string: String): Optional<DelegatedVehicle>

}