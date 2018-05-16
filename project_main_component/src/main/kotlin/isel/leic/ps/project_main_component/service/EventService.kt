package isel.leic.ps.project_main_component.service

import isel.leic.ps.project_main_component.domain.model.Event
import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.exceptions.FailedToAddEventException
import isel.leic.ps.project_main_component.exceptions.FailedToAddUserException
import isel.leic.ps.project_main_component.exceptions.NoSuchUserException
import isel.leic.ps.project_main_component.repository.EventRepository
import isel.leic.ps.project_main_component.repository.UserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.net.HttpURLConnection
import java.net.URL
import java.io.InputStreamReader
import java.io.BufferedReader
import org.json.JSONArray
import org.json.JSONObject
import java.io.OutputStreamWriter
import javax.net.ssl.HttpsURLConnection


@Service
class EventService {

    @Autowired
    lateinit var eventRepository: EventRepository

    fun addEvent(event: Event): Event {
        try {
            val save = eventRepository.save(event)

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
            app_id.put("app_id","75a88678-2deb-40be-8a8c-3b05309761b8")

            val segments = JSONArray()
            segments.put("All")
            app_id.put("included_segments",segments)

            val data =JSONObject()
            data.put("foo", "bar")
            app_id.put("data",data)

            val contents = JSONObject()
            contents.put("en","English Message")
            app_id.put("contents",contents)

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

    fun removeEvent(id:Int){
        try {
            eventRepository.deleteById(id)
        }
        catch (e:Exception){
            throw NoSuchUserException()
        }
    }

    fun updateEvent(event:Event){
        try {
            eventRepository.save(event);
        }
        catch (e:Exception){

        }

    }
}