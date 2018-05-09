package isel.leic.ps.project_main_component.domain.model

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "vehicle", schema = "public")
class Vehicle() {

    @Id
    lateinit var plate: String

    lateinit var registryDate: Date

    var isSubscribed: Boolean = false

    var ownerId: Int = 0

}