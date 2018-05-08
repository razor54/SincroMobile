package isel.leic.ps.project_main_component.domain.model

import com.sun.org.apache.xpath.internal.operations.Bool
import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table

@Entity
@Table(name = "vehicle", schema = "public")
class Vehicle(@Id val plate: String, var ownerId: Int, val registryDate: Date,var isSubscribed: Bool) {
}