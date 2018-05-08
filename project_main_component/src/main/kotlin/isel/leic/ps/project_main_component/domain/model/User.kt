package isel.leic.ps.project_main_component.domain.model

import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "user", schema = "public")
class User(@Id @NotNull val id: Int, @NotNull var email: String, @NotNull var name: String, var phoneNumber: Number) {
}