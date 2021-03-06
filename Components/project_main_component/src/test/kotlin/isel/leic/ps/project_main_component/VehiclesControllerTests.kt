package isel.leic.ps.project_main_component

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.domain.model.Vehicle
import isel.leic.ps.project_main_component.repository.DelegateRequestRepository
import isel.leic.ps.project_main_component.repository.DelegatedVehicleRepository
import isel.leic.ps.project_main_component.repository.UserRepository
import isel.leic.ps.project_main_component.repository.VehicleRepository
import isel.leic.ps.project_main_component.service.HistoryService
import isel.leic.ps.project_main_component.service.UserService
import isel.leic.ps.project_main_component.service.VehicleService
import org.junit.Assert
import org.junit.Assert.assertNotNull

import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.junit4.SpringRunner
import org.springframework.boot.test.context.TestConfiguration
import org.springframework.context.annotation.Bean
import org.mockito.Mockito
import org.mockito.MockitoAnnotations
import org.springframework.boot.test.mock.mockito.MockBean
import java.util.*


@RunWith(SpringRunner::class)
@SpringBootTest()
class VehiclesControllerTests {


    @MockBean
    lateinit var userRepository: UserRepository

    @MockBean
    lateinit var vehicleRepository: VehicleRepository

    @MockBean
    lateinit var delegatedVehicleRepository: DelegatedVehicleRepository

    @MockBean
    lateinit var delegateRequestRepository: DelegateRequestRepository

    @MockBean
    lateinit var historyService: HistoryService

    @Before
    fun setUp() {
        MockitoAnnotations.initMocks(this)


        vehicleService = VehicleService(vehicleRepository, userService, delegateRequestRepository, delegatedVehicleRepository, historyService)

        val alex = User()
        alex.id = 12345
        alex.name = "Alex"


        Mockito.`when`(userRepository.findById(alex.id))
                .thenReturn(Optional.of(alex))

        Mockito.`when`(userService.getUser(alex.id))
                .thenReturn(alex)

        val sirocco = Vehicle()
        sirocco.plate = "11-AA-11"
        sirocco.ownerId = 12345
        val vehicleList = listOf(sirocco)

        var vehicle = Vehicle()
        vehicle.ownerId = 12345
        vehicle.plate = "ABC"
        vehicle.isSubscribed = true
        vehicle.registryDate = Date(2010, 1, 1)

        Mockito.`when`(vehicleRepository.findAllByOwnerId(alex.id))
                .thenReturn(vehicleList)

        Mockito.`when`(vehicleRepository.findById(sirocco.plate))
                .thenReturn(Optional.of(sirocco))

        // Mockito.`when`(vehicleService.getSubscribedVehicle(sirocco.plate))
        //         .thenReturn(sirocco)

    }


    @MockBean
    lateinit var userService: UserService


    lateinit var vehicleService: VehicleService

    @Test
    fun getUserTest() {
        var id = 12345
        var name = "Alex"
        var user = userService.getUser(id)

        assertNotNull(user)
        assert(id == user.id)
        assert(name == user.name)


    }


    @Test
    fun getVehicle() {

        var plate = "11-AA-11"

        var vehicles = vehicleService.getSubscribedVehicle(plate)

        assertNotNull(vehicles)

        assert(vehicles.plate == plate)


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