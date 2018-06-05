package isel.leic.ps.project_main_component.domain.model

import javax.persistence.*


@Entity
@Table(name = "delegate_requests", schema = "public")
class DelegateRequest {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Int = 0

    lateinit var plate: String

    var ownerId: Int = 0

    var userBorrowId: Int = 0

}