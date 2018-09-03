package isel.leic.ps.project_main_component

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.repository.EventRepository
import isel.leic.ps.project_main_component.repository.UserRepository
import isel.leic.ps.project_main_component.repository.VehicleRepository
import isel.leic.ps.project_main_component.service.EventService
import isel.leic.ps.project_main_component.service.HistoryService
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.mockito.Mockito
import org.mockito.MockitoAnnotations
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.boot.test.mock.mockito.MockBean
import org.springframework.context.annotation.Bean
import org.springframework.test.context.junit4.SpringRunner
import java.util.*


@RunWith(SpringRunner::class)
@SpringBootTest()
class EventControllerTests {


    @MockBean
    lateinit var userRepository: UserRepository

    @MockBean
    lateinit var vehicleRepository: VehicleRepository

    @MockBean
    lateinit var eventRepository: EventRepository

    @Before
    fun setUp() {
        MockitoAnnotations.initMocks(this)

        val alex = User()
        alex.id = 12345
        alex.name = "Alex"


        Mockito.`when`(userRepository.findById(alex.id))
                .thenReturn(Optional.of(alex))
        Mockito.`when`(userRepository.existsById(alex.id)).thenReturn(true)


        val sirocco = Vehicle()
        sirocco.plate = "11-AA-11"
        sirocco.ownerId = 12345
        val vehicleList = listOf(sirocco)

        Mockito.`when`(vehicleRepository.findAllByOwnerId(alex.id))
                .thenReturn(vehicleList)

        Mockito.`when`(vehicleRepository.findById(sirocco.plate))
                .thenReturn(Optional.of(sirocco))

        Mockito.`when`(vehicleService.getSubscribedVehicle(sirocco.plate))
                .thenReturn(sirocco)

        var event = Event()
        event.driverId = alex.id
        event.plate = sirocco.plate
        event.id = 1
        event.date = Date(2010, 10, 1)

        var list = listOf(event)

        Mockito.`when`(eventRepository.findAllByDriverId(alex.id)).thenReturn(list)

        userService = UserService(userRepository)
        eventService = EventService(eventRepository, userService, vehicleService, historyService)

    }


    lateinit var userService: UserService

    @MockBean
    lateinit var vehicleService: VehicleService

    @MockBean
    lateinit var historyService: HistoryService

    lateinit var eventService: EventService

    @Test
    fun getUserEventsTest() {
        var id = 12345
        var name = "Alex"
        var user = userService.getUser(id)


        var events = eventService.getUserEvents(id)

        Assert.assertNotNull(events)

        assert(events.size == 1)
        assert(events[0].driverId == id)
        assert(events[0].plate == "11-AA-11")
        assert(events[0].id == 1)


    }


/*
    @Test
    fun getUserSubscribedVehicles() {
        var id = 12345

        var vehicles = vehicleService.getUserSubscribedVehicles(id)

        assertNotNull(vehicles)
        assert(vehicles[0].ownerId == id)


    }

*/

}