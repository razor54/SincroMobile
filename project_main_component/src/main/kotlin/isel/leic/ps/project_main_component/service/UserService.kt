package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.slf4j.Logger
import org.slf4j.LoggerFactory

@Service
class UserService {
    
    var logger : Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    @Autowired
    lateinit var userRepository: UserRepository

    fun addUser(user: User): User {
        
        logger.debug("Started to add user")
        try {
            val save = userRepository.save(user)
            logger.info("Method \"{}\" UserId \"{}\" ","Add User", user.id)
            return save
        } catch (e: Exception) {
            logger.warn("Method \"{}\" UserId \"{}\" ","Add User", user.id)
            throw FailedToAddUserException()
        }
    }

    fun getUser(id: Int): User {
        logger.debug("Started to get user")

        val user = userRepository.findById(id)
        if (user.isPresent) {
            logger.info("Method \"{}\" UserId \"{}\" ","Get User", id)
            return user.get()
        }

        logger.warn("Method \"{}\" UserId \"{}\" ","Get User", id)
        throw NoSuchUserException()
    }


    fun getUser(email:String):User{
        logger.debug("Started to get user")

        try {
            val user = userRepository.findByEmail(email)
            logger.info("Method \"{}\" UserId \"{}\" ","Get User By Email", email)
            return user
        }
        catch (e:Exception){
            logger.warn("Method \"{}\" UserId \"{}\" ","Get User By Email", email)
            throw NoSuchUserException()
        }
    }

    fun removeUser(id:Int){
        logger.debug("Started to remove user")

        try {
            userRepository.deleteById(id)
            logger.info("Method \"{}\" UserId \"{}\" ","Remove User", id)
        }
        catch (e:Exception){
            logger.warn("Method \"{}\" UserId \"{}\" ","Remove User", id)
            throw NoSuchUserException()
        }
    }

    fun constainsUser(id: Int):Boolean{

        return userRepository.existsById(id)
    }


}