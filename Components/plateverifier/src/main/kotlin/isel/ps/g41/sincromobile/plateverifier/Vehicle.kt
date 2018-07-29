package isel.ps.g41.sincromobile.plateverifier

import org.hibernate.annotations.Check
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
    var ownerId: Int = 0

}