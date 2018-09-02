package isel.leic.ps.project_main_component.service

import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.module.kotlin.readValue
import isel.leic.ps.project_main_component.domain.model.Auth0User
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.InvalidCredentialsException
import isel.leic.ps.project_main_component.exceptions.NoSuchTokenException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.UserRepository
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.PropertySource
import org.springframework.transaction.annotation.Transactional
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import java.io.*


@PropertySource(ignoreResourceNotFound = true, value = ["classpath:auth0.properties"])
@Service
class UserService(val userRepository: UserRepository) {

    var logger: Logger = LoggerFactory.getLogger(EventService::class.simpleName)

    private val bcrypt = BCryptPasswordEncoder()

    @Value("\${auth0.apiAudience}")
    private lateinit var audience: String

    @Value("\${auth0.clientId}")
    private lateinit var clientId: String

    @Value("\${auth0.clientSecret}")
    private lateinit var clientSecret: String

    @Value("\${auth0.signUp}")
    private lateinit var signUpURL: String

    @Value("\${auth0.getToken}")
    private lateinit var tokenURL: String

    @Value("\${auth0.userInfo}")
    private lateinit var userInfo: String



    @Transactional(rollbackFor = [(Exception::class)])
    fun addUser(user: User): User {

        logger.debug("Started to add user")
        try {
            user.password = bcrypt.encode(user.password)
            val save = userRepository.save(user)


            if (!addUserAuth0(user))
                throw FailedToAddUserException()

            logger.info("Method \"{}\" UserId \"{}\" ", "Add User", user.id)
            return save
        } catch (e: Exception) {
            logger.warn("Method \"{}\" UserId \"{}\" ", "Add User", user.id)
            throw FailedToAddUserException()
        }
    }

    fun getUserAuth(authorization: String): User {

        val url = URL(userInfo)
        val con = url.openConnection() as HttpsURLConnection
        con.requestMethod = "GET"
        con.doInput = true
        con.doOutput = true
        //con.setRequestProperty("Content-Type", "application/json")
        con.setRequestProperty("Accept", "application/json")
        con.setRequestProperty("Authorization", authorization)


        val HttpResult = con.responseCode
        if (HttpResult == HttpURLConnection.HTTP_OK) {
            var userStr = readFullyAsString(con.getInputStream(), "UTF-8")
            var objectMapper = ObjectMapper()

            val userS: Auth0User = objectMapper.readValue(userStr, Auth0User::class.java)

            val user : User = getUser(userS.email)

            logger.info("Method \"{}\"  UserID \"{}\" ", "Authenticate User" ,user.id)
            return user

        } else {
            logger.warn("Method \"{}\" UserID \"{}\" ", "Authenticate User", "Invalid User")
            throw NoSuchUserException()
        }

    }

    fun getUser(id: Int): User {
        logger.debug("Started to get user")

        val user = userRepository.findById(id)
        if (user.isPresent) {
            logger.info("Method \"{}\" UserId \"{}\" ", "Get User", id)
            return user.get()
        }

        logger.warn("Method \"{}\" UserId \"{}\" ", "Get User", id)
        throw NoSuchUserException()
    }


    fun getUser(email: String): User {
        logger.debug("Started to get user")

        try {
            val user = userRepository.findByEmail(email)
            logger.info("Method \"{}\" UserId \"{}\" ", "Get User By Email", email)
            return user
        } catch (e: Exception) {
            logger.warn("Method \"{}\" UserId \"{}\" ", "Get User By Email", email)
            throw NoSuchUserException()
        }
    }


    fun removeUser(id: Int) {
        logger.debug("Started to remove user")

        try {
            userRepository.deleteById(id)
            logger.info("Method \"{}\" UserId \"{}\" ", "Remove User", id)
        } catch (e: Exception) {
            logger.warn("Method \"{}\" UserId \"{}\" ", "Remove User", id)
            throw NoSuchUserException()
        }
    }

    fun containsUser(id: Int): Boolean {
        return userRepository.existsById(id)
    }


    private fun addUserAuth0(user: User): Boolean {
        val url = URL(signUpURL)
        val con = url.openConnection() as HttpsURLConnection
        con.requestMethod = "POST"
        con.doInput = true
        con.doOutput = true
        //con.setRequestProperty("Content-Type", "application/json")
        con.setRequestProperty("Accept", "application/json")
        con.setRequestProperty("Content-Type", "application/json; charset=UTF-8")

        /*
         *   {
         *     "client_id": "19UKWTJfeSlmTxxONlPFW3mYyAqeYbsS",
         *     "email": "user@test.com",
         *     "password": "password",
         *     "connection": "Username-Password-Authentication"
         *   }
         *
         */

        val signup = JSONObject()
        signup.put("client_id", clientId)
        signup.put("email", user.email)
        signup.put("password", user.password)
        signup.put("connection", "Username-Password-Authentication")

        val userMetadata = JSONObject()
        userMetadata.put("name", user.name)
        userMetadata.put("nif", user.id.toString())

        signup.put("user_metadata", userMetadata)

        val wr = OutputStreamWriter(con.outputStream)
        wr.write(signup.toString())
        wr.flush()


        //display what returns the POST request


        val HttpResult = con.responseCode
        if (HttpResult == HttpURLConnection.HTTP_OK) {
            logger.info("Method \"{}\" UserID \"{}\" ", "Successfully registered", user.id)
            return true

        } else {
            logger.warn("Method \"{}\" UserID \"{}\" ", "Error while register", user.id)
            return false
        }
    }

    fun getToken(user: User): String {

        val url = URL(tokenURL)
        val con = url.openConnection() as HttpsURLConnection
        con.requestMethod = "POST"
        con.doInput = true
        con.doOutput = true
        //con.setRequestProperty("Content-Type", "application/json")
        con.setRequestProperty("Accept", "application/json")
        con.setRequestProperty("Content-Type", "application/json; charset=UTF-8")

        /*
         *   {
          *      "client_id":"19UKWTJfeSlmTxxONlPFW3mYyAqeYbsS",
         *       "client_secret":"0CB3QGX8m8TxvujUityXME-q1E8ucCDzmZL2o91IuBSPZlrXOw_XsQPkMV1jaddF",
         *       "audience":"sincro-mobile-auth",
         *       "grant_type":"password",
         *       "username": "user@test.com",
         *       "password": "password"
         *       "scope":"openid"
         *
         *      }
         *
         */

        val signup = JSONObject()
        signup.put("client_id", clientId)
        signup.put("password", user.password)
        signup.put("client_secret", clientSecret)
        signup.put("audience", audience)
        signup.put("grant_type", "password")
        signup.put("username", user.email)
        signup.put("scope", "openid")

        val wr = OutputStreamWriter(con.outputStream)
        wr.write(signup.toString())
        wr.flush()


        //display what returns the POST request


        val HttpResult = con.responseCode
        if (HttpResult == HttpURLConnection.HTTP_OK) {
            logger.info("Method \"{}\" UserID \"{}\" ", "Successfully got token", user.id)
            return readFullyAsString(con.getInputStream(), "UTF-8")

        } else {
            logger.warn("Method \"{}\" UserID \"{}\" ", "Error while getting token", user.id)
            throw InvalidCredentialsException()
        }
    }

    @Throws(IOException::class)
    fun readFullyAsString(inputStream: InputStream, encoding: String): String {
        return readFully(inputStream).toString(encoding)
    }

    @Throws(IOException::class)
    private fun readFully(inputStream: InputStream): ByteArrayOutputStream {
        val baos = ByteArrayOutputStream()
        val buffer = ByteArray(1024)
        var length: Int
        do {
            length = inputStream.read(buffer)
            if (length == -1) break
            baos.write(buffer, 0, length)
        } while (true)

        return baos
    }

    fun verifyUserPassword(id: Int, password: String): User {

        val user = getUser(id)

        if (bcrypt.matches(password, user.password))
            return user

        throw InvalidCredentialsException()
    }

    fun updateDeviceId(userId:Int, deviceId:String?){

        var user = getUser(userId)

        if(deviceId!=null){
            user.playerId = deviceId

            try{
                userRepository.save(user)
            }
            catch(e:Exception){
                throw FailedToAddUserException()
            }

        }


    }

}