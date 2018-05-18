package isel.leic.ps.project_main_component.domain.model

import com.fasterxml.jackson.annotation.JsonIgnore
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Id
import javax.persistence.Table
import javax.validation.constraints.NotNull

@Entity
@Table(name = "user", schema = "public")
class User {

    @Id
    var id: Int = 0

    @Column(unique = true)
    @NotNull
    lateinit var email: String

    @NotNull
    lateinit var name: String

    @NotNull
    lateinit var password: String

    // @NotNull User might not want to receive notification
    // @JsonIgnore
    var playerId: String? = null
}