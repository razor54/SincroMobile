package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.History
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface HistoryRepository : CrudRepository<History, Int> {

    fun findAllByDriverId(driverId: Int): List<History>

}