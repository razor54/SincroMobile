package isel.leic.ps.project_main_component.domain.model

import org.hibernate.annotations.Check
import java.util.*
import javax.persistence.*
import javax.validation.constraints.NotNull


@Entity
@Table(name = "history", schema = "public")
class History {

    @Id
    @NotNull
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    var id: Int = 0

    @NotNull
    lateinit var date: Date

    @NotNull
    var driverId: Int = 0


    @Check(constraints = "Payment OR Delegate OR Borrow OR Borrow Cancel OR Delegate Cancel")
    lateinit var state:String


    // payment of event with actionId or vehicle plate
    lateinit var actionId :String

}