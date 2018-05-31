package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.BorrowedVehicle
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface BorrowedVehicleRepository: CrudRepository<BorrowedVehicle, Int>  {

    fun findAllByUserId(id:Int): Optional<BorrowedVehicle>
}