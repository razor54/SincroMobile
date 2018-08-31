package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.handlers.NotificationHandler
import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.History
import isel.leic.ps.project_main_component.exceptions.*
import isel.leic.ps.project_main_component.repository.EventRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.util.*


@Service
class EventService {

    var logger: Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    @Autowired
    lateinit var eventRepository: EventRepository
    @Autowired
    lateinit var userService: UserService

    @Autowired
    lateinit var vehicleService: VehicleService

    @Autowired
    private lateinit var historyService: HistoryService


    fun addEvent(event: Event): Event {
        // TODO maybe based on vehicle and then get driver Id

        logger.debug("Started to add event")

        if (eventRepository.existsById(event.id)) {
            logger.warn("Method \"{}\" EventId \"{}\" ", "Add Event", event.id)
            throw EventAlreadyExistsException()
        }

        lateinit var savedEvent: Event

        try {
            val plate = event.plate

            val vehicle = vehicleService.getSubscribedVehicle(plate)

            val state = vehicle.delegateState




            logger.info("Method \"{}\" EventId \"{}\" ", "Add Event", event.id)
            savedEvent = eventRepository.save(event)

            if (!vehicle.isSubscribed)
                return savedEvent

            val driverId: Int

            driverId = if (state.equals("Pending") || state.equals("False")) {
                vehicle.ownerId
            } else vehicleService.getCurrentDriverId(plate)

            val user = userService.getUser(driverId)
            NotificationHandler.sendNotification(user)

            val owner = vehicle.ownerId
            if (owner != user.id) {
                val userOwner = userService.getUser(owner)
                NotificationHandler.sendNotification(userOwner)
            }

            event.driverId = driverId
            savedEvent = eventRepository.save(event)


            return savedEvent

        } catch (e: Exception) {

            logger.warn("Method \"{}\" EventId \"{}\" ", "Add Event", event.id)

            eventRepository.delete(savedEvent)
            throw FailedToAddEventException()
        }
    }


    fun getEvent(id: Int): Event {
        logger.debug("Started to get event")

        val event = eventRepository.findById(id)
        if (event.isPresent) {
            logger.info("Method \"{}\" EventId \"{}\" ", "Get Event", id)

            return event.get()
        }

        logger.warn("Method \"{}\" EventId \"{}\" ", "Get Event", id)
        throw NoSuchUserException()

    }


    fun getUserEvents(id: Int): List<Event> {
        logger.debug("Started to get user events")

        if (!userService.containsUser(id)) {
            logger.warn("Method \"{}\" UserId \"{}\" ", "Get User Events", id)
            throw NoSuchUserException()
        }

        val events: List<Event> = eventRepository.findAllByDriverId(id)

        val otherEvents = getEventsForEachUserVehicles(id)
        logger.info("Method \"{}\" UserId \"{}\" ", "Get User Events", id)
        return events.plus(otherEvents)
    }


    fun getEventsForEachUserVehicles(id: Int): List<Event> {
        var vehicles = vehicleService.getUserSubscribedVehicles(id)

        var events = vehicles.flatMap { eventRepository.findAllByPlate(it.plate) }

        return events.filter { it.driverId != id }


    }

    fun removeEvent(id: Int) {
        logger.debug("Started to remove event")

        try {
            eventRepository.deleteById(id)
            logger.info("Method \"{}\" EventId \"{}\" ", "Remove Event", id)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" EventId \"{}\" ", "Remove Event", id)
            throw NoSuchUserException()
        }
    }

    fun updateEvent(event: Event) {
        logger.debug("Started to update event")


        if (!eventRepository.existsById(event.id)) {
            logger.warn("Method \"{}\" EventId \"{}\" ", "Update Event", event.id)
            throw NoSuchUserException()
        }


        try {
            eventRepository.save(event)
            logger.info("Method \"{}\" EventId \"{}\" ", "Update Event", event.id)

        } catch (e: Exception) {
            logger.warn("Method \"{}\" EventId \"{}\" ", "Update Event", event.id)
            throw FailedToUpdateEventException()
        }

    }

    fun payEvent(event: Event):Event {
        logger.debug("Started to pay event")


        var ev = getEvent(event.id)


        try {

            ev.state = "Paid"

            var history = History()

            history.driverId = ev.driverId
            history.date = Date()
            history.state = "Payment"
            history.actionId = ev.plate
            historyService.addHistoryElement(history)

            logger.info("Method \"{}\" EventId \"{}\" ", "Pay Event", ev.id)

            return ev

        } catch (e: Exception) {
            logger.warn("Method \"{}\" EventId \"{}\" ", "Pay Event", ev.id)
            throw NoSuchEventException()
        }

    }


}