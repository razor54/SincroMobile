package isel.leic.ps.project_main_component.service
import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.exceptions.EventAlreadyExistsException
import isel.leic.ps.project_main_component.exceptions.FailedToAddEventException
import isel.leic.ps.project_main_component.exceptions.FailedToUpdateEventException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.EventRepository
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection
import org.slf4j.Logger
import org.slf4j.LoggerFactory


@Service
class EventService {

    var logger : Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    @Autowired
    lateinit var eventRepository: EventRepository
    @Autowired
    lateinit var userService: UserService


    fun addEvent(event: Event): Event {
        // TODO maybe based on vehicle and then get driver Id

        logger.debug("Started to add event")

        if(eventRepository.existsById(event.id)){
            logger.warn("Method \"{}\" EventId \"{}\" ","Add Event", event.id)
            throw EventAlreadyExistsException()
        }

        try {

            val savedEvent = eventRepository.save(event)
            logger.info("Method \"{}\" EventId \"{}\" ","Add Event", event.id)

            val user = userService.getUser(savedEvent.driverId)
            NotificationHandler.sendNotification(user)


            return savedEvent
        } catch (e: Exception) {

            logger.warn("Method \"{}\" EventId \"{}\" ","Add Event", event.id)
            throw FailedToAddEventException()
        }
    }


    fun getEvent(id: Int): Event {
        logger.debug("Started to get event")

        val event = eventRepository.findById(id)
        if (event.isPresent) {
            logger.info("Method \"{}\" EventId \"{}\" ","Get Event", id)

            return event.get()
        }

        logger.warn("Method \"{}\" EventId \"{}\" ","Get Event", id)
        throw NoSuchUserException()

    }


    fun getUserEvents(id: Int): List<Event> {
        logger.debug("Started to get user events")

        if(!userService.constainsUser(id)){
            logger.warn("Method \"{}\" UserId \"{}\" ","Get User Events", id)
            throw NoSuchUserException()
        }

        val events : List<Event> = eventRepository.findAllByDriverId(id)
        logger.info("Method \"{}\" UserId \"{}\" ","Get User Events", id)
        return events
    }


    fun removeEvent(id: Int) {
        logger.debug("Started to remove event")

        try {
            eventRepository.deleteById(id)
            logger.info("Method \"{}\" EventId \"{}\" ","Remove Event", id)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" EventId \"{}\" ","Remove Event", id)
            throw NoSuchUserException()
        }
    }

    fun updateEvent(event: Event) {
        logger.debug("Started to update event")


        if(!eventRepository.existsById(event.id)) {
            logger.warn("Method \"{}\" EventId \"{}\" ","Update Event", event.id)
            throw NoSuchUserException()
        }


        try {
            eventRepository.save(event)
            logger.info("Method \"{}\" EventId \"{}\" ","Update Event", event.id)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" EventId \"{}\" ","Update Event", event.id)
            throw FailedToUpdateEventException()
        }

    }



}