package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.FailedToAddEventException
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.EventRepository
import isel.leic.ps.project_main_component.repository.UserRepository
import org.hibernate.mapping.Array
import org.json.JSONArray
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.net.HttpURLConnection
import java.net.URL
import java.io.InputStreamReader
import java.io.BufferedReader

import java.io.OutputStreamWriter
import javax.net.ssl.HttpsURLConnection


@Service
class EventService {

    @Autowired
    lateinit var eventRepository: EventRepository
    @Autowired
    lateinit var userService: UserService

    fun addEvent(event: Event): Event {
        try {
            val save = eventRepository.save(event)
            // TODO maybe based on vehicle and then get driver Id
            sendNotification(event.driverId)

            return save
        } catch (e: Exception) {
            throw FailedToAddEventException()
        }
    }


    fun getEvent(id: Int): Event {

        val event = eventRepository.findById(id)
        if (event.isPresent) return event.get()
        throw NoSuchUserException()

    }


    fun getUserEvents(id: Int): List<Event> {
        return eventRepository.findAllByDriverId(id)
    }


    fun removeEvent(id: Int) {
        try {
            eventRepository.deleteById(id)
        } catch (e: Exception) {
            throw NoSuchUserException()
        }
    }

    fun updateEvent(event: Event) {
        try {
            eventRepository.save(event)
        } catch (e: Exception) {

        }

    }


    private fun sendNotification(driverId: Int) {

        var user = userService.getUser(driverId)

        val playerId = user.playerId

        if(playerId ==null|| playerId.isEmpty())
            return

        val url = URL("https://onesignal.com/api/v1/notifications")
        val con = url.openConnection() as HttpsURLConnection
        con.requestMethod = "POST"
        con.doInput = true
        con.doOutput = true
        //con.setRequestProperty("Content-Type", "application/json")
        con.setRequestProperty("Accept", "application/json")
        con.setRequestProperty("Content-Type", "application/json; charset=UTF-8")
        con.setRequestProperty("Authorization", "Basic NTZiM2RhNGUtNmZkYS00Yzc3LTg4M2ItZGNlNjY1ZjcwMTBj");

        val app_id = JSONObject()
        app_id.put("app_id", "75a88678-2deb-40be-8a8c-3b05309761b8")

        val playerIds = JSONArray()
        playerIds.put(playerId)
        app_id.put("include_player_ids", playerIds)

        val data = JSONObject()
        data.put("foo", "bar")
        app_id.put("data", data)

        val contents = JSONObject()
        contents.put("en", "You have a new event")
        app_id.put("contents", contents)

        val headings = JSONObject()
        headings.put("en", "New Event")
        app_id.put("headings", headings)

        val buttons =JSONArray()
        val button1 = JSONObject()
        button1.put("id","id1")
        button1.put("text","Click here for details")
        button1.put("icon","ic_menu_share")

        val button2 = JSONObject()
        button2.put("id","id2")
        button2.put("text","Click here for even more details")

        buttons.put(button1)
        buttons.put(button2)
        app_id.put("buttons",buttons)

        val wr = OutputStreamWriter(con.outputStream)
        wr.write(app_id.toString())
        wr.flush()

        System.out.println(app_id.toString())

        //display what returns the POST request


        val HttpResult = con.responseCode
        if (HttpResult == HttpURLConnection.HTTP_OK) {

        } else {
            System.out.println(con.responseMessage)
        }
    }
}