package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.Event
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface EventRepository : CrudRepository<Event,Int> {

    fun findAllByDriverId(driverId:Int):List<Event>;
}