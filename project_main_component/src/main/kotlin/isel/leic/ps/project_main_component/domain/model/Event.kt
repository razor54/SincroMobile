package isel.leic.ps.project_main_component.domain.model

import java.util.*
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "event", schema = "public")
class Event(@Id @NotNull val id: Int, @NotNull val date: Date, @NotNull var verified: Boolean) {


}