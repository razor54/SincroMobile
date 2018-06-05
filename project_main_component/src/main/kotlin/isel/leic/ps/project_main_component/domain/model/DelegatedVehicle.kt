package isel.leic.ps.project_main_component.domain.model

import javax.persistence.*

@Entity
@Table(name = "vehicle_delegated", schema = "public")
class DelegatedVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0

    var userBorrowId: Int = 0

    lateinit var vehicleId: String
}