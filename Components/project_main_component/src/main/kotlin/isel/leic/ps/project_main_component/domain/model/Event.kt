package isel.leic.ps.project_main_component.domain.model

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "event", schema = "public")
class Event {

    @Id
    @NotNull
    var id: Int = 0

    @NotNull
    lateinit var date: Date

    @NotNull
    var verified: Boolean = false

    @NotNull
    lateinit var plate: String

    @NotNull
    lateinit var location: String

    @NotNull
    lateinit var gpsLatitude: String

    @NotNull
    lateinit var gpsLongitude: String

    @NotNull
    var driverId: Int = 0

}