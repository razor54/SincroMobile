package isel.ps.g41.sincromobile.plateverifier

import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface VehicleRepository: CrudRepository<Vehicle, String> {

    fun findAllByOwnerId(id:Int):List<Vehicle>
}