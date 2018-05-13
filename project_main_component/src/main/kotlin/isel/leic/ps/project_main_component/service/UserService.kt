package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service

@Service
class UserService {
    @Autowired
    lateinit var userRepository: UserRepository

    fun addUser(user: User): User {
        try {
            val save = userRepository.save(user)
            return save
        } catch (e: Exception) {
            throw FailedToAddUserException()
        }
    }

    fun getUser(id: Int): User {

        val user = userRepository.findById(id)
        if (user.isPresent) return user.get()
        throw NoSuchUserException()

    }

    fun getUser(email:String):User{
        try {
            val user = userRepository.findByEmail(email)
            return user;
        }
        catch (e:Exception){
            throw NoSuchUserException()
        }



    }

    fun removeUser(id:Int){
        try {
            userRepository.deleteById(id)
        }
        catch (e:Exception){
            throw NoSuchUserException()
        }
    }


}