package isel.leic.ps.project_main_component.repository

import isel.leic.ps.project_main_component.domain.model.User
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository

@Repository
interface UserRepository:CrudRepository<User,Int> {
}