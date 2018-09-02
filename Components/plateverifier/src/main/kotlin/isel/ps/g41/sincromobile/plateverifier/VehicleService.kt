package isel.ps.g41.sincromobile.plateverifier

import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service


@Service
class VehicleService {

    var logger: Logger = LoggerFactory.getLogger(VehicleService::class.simpleName)

    @Autowired
    private lateinit var vehicleRepository: VehicleRepository

    fun getUserVehicles(id: Int) : List<Vehicle>{

        return vehicleRepository.findAllByOwnerId(id)
    }
}