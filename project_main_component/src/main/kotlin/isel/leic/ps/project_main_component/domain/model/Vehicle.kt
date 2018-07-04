package isel.leic.ps.project_main_component.domain.model

import org.hibernate.annotations.Check
import org.springframework.format.annotation.DateTimeFormat
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
    @Check(constraints = "False OR True OR Pending")
    var delegateState : String = "False"
}