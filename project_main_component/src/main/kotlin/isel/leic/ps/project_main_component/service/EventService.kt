package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.FailedToAddEventException
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.EventRepository
import isel.leic.ps.project_main_component.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class EventService {

    @Autowired
    lateinit var eventRepository: EventRepository

    fun addEvent(event: Event): Event {
        try {
            val save = eventRepository.save(event)
            return save
        } catch (e: Exception) {
            throw FailedToAddEventException()
        }
    }

    fun getEvent(id: Int): Event {

        val event = eventRepository.findById(id)
        if (event.isPresent) return event.get()
        throw NoSuchUserException()

    }

    fun removeEvent(id:Int){
        try {
            eventRepository.deleteById(id)
        }
        catch (e:Exception){
            throw NoSuchUserException()
        }
    }

    fun updateEvent(event:Event){
        try {
            eventRepository.save(event);
        }
        catch (e:Exception){

        }

    }
}