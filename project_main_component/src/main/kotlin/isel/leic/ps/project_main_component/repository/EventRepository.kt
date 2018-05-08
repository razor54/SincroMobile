package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.Event
import org.springframework.data.repository.CrudRepository

interface EventRepository : CrudRepository<Event,Int> {
}