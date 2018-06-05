package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.DelegateRequest
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*


@Repository
interface DelegateRequestRepository : CrudRepository<DelegateRequest, Int> {

    fun findAllByOwnerId(id: Int): List<DelegateRequest>
    fun findAllByUserBorrowId(id: Int): List<DelegateRequest>
    fun findByPlate(string: String): Optional<DelegateRequest>

}