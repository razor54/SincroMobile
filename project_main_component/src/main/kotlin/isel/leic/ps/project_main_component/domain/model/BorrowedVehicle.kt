package isel.leic.ps.project_main_component.domain.model

import javax.persistence.*

@Entity
@Table(name = "vehicle_borrows", schema = "public")
class BorrowedVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0

    var userId: Int = 0

    lateinit var vehicleId: String

}