package isel.leic.ps.project_main_component.domain.model

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "vehicle", schema = "public")
class Vehicle {

    @Id
    lateinit var plate: String

    @NotNull
    lateinit var registryDate: Date

    @NotNull
    var isSubscribed: Boolean = false

    @NotNull
    var ownerId: Int = 0

    @NotNull
    var isBorrowed = false

    var borrowId: Int? = null

}