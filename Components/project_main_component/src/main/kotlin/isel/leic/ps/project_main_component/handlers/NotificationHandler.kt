package isel.leic.ps.project_main_component.handlers

import isel.leic.ps.project_main_component.domain.model.User
import isel.leic.ps.project_main_component.service.EventService
import org.json.JSONArray
import org.json.JSONObject
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL
import javax.net.ssl.HttpsURLConnection


object NotificationHandler {

    var logger: Logger = LoggerFactory.getLogger(NotificationHandler::class.simpleName)

    var onesignalUrl = "https://onesignal.com/api/v1/notifications"
    fun sendNotification(user: User) {

        logger.debug("Started to send notification")

        val playerId = user.playerId

        if (playerId == null || playerId.isEmpty())
            return

        var con: HttpsURLConnection? = null
        try {

            val url = URL(onesignalUrl)
            con = url.openConnection() as HttpsURLConnection
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

            /*  val buttons = JSONArray()
              val button1 = JSONObject()
              button1.put("id", "id1")
              button1.put("text", "Click here for details")
              button1.put("icon", "ic_menu_share")

              val button2 = JSONObject()
              button2.put("id", "id2")
              button2.put("text", "Click here for even more details")

              buttons.put(button1)
              buttons.put(button2)
              */

            // app_id.put("buttons", buttons)

            val wr = OutputStreamWriter(con.outputStream)
            wr.write(app_id.toString())
            wr.flush()


            //display what returns the POST request


            val HttpResult = con.responseCode
            if (HttpResult == HttpURLConnection.HTTP_OK) {
                logger.info("Method \"{}\" UserID \"{}\" ", "Send Notification", user.id)

            } else {
                logger.warn("Method \"{}\" UserID \"{}\" ", "Send Notification", user.id)
                System.out.println(con.responseMessage)
            }
        } catch (e: Exception) {
        } finally {
            con!!.disconnect()
        }

    }

    fun vehicleBorrowNotification(user: User) {
        logger.debug("Started to send borrow notification")

        val playerId = user.playerId

        if (playerId == null || playerId.isEmpty())
            return

        var con: HttpsURLConnection? = null
        try {

            val url = URL(onesignalUrl)
            con = url.openConnection() as HttpsURLConnection
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
            contents.put("en", "Someone is borrowing you a vehicle")
            app_id.put("contents", contents)

            val headings = JSONObject()
            headings.put("en", "Vehicle Borrow")
            app_id.put("headings", headings)

            /*val buttons = JSONArray()
            val button1 = JSONObject()
            button1.put("id", "id1")
            button1.put("text", "Accept")
            button1.put("icon", "ic_menu_share")

            val button2 = JSONObject()
            button2.put("id", "id2")
            button2.put("text", "Refuse")

            buttons.put(button1)
            buttons.put(button2)
            app_id.put("buttons", buttons)
            */

            val wr = OutputStreamWriter(con.outputStream)
            wr.write(app_id.toString())
            wr.flush()


            //display what returns the POST request


            val HttpResult = con.responseCode
            if (HttpResult == HttpURLConnection.HTTP_OK) {
                logger.info("Method \"{}\" UserID \"{}\" ", "Send Notification", user.id)

            } else {
                logger.warn("Method \"{}\" UserID \"{}\" ", "Send Notification", user.id)
                System.out.println(con.responseMessage)
            }
        } catch (e: Exception) {
        } finally {
            con!!.disconnect()
        }
    }

    fun vehicleBorrowCancelNotification(user: User) {
        logger.debug("Started to send borrow notification")


        val playerId = user.playerId

        if (playerId == null || playerId.isEmpty())
            return

        var con: HttpsURLConnection? = null
        try {

            val url = URL(onesignalUrl)
            con = url.openConnection() as HttpsURLConnection
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

            val contents = JSONObject()
            contents.put("en", "A vehicle you were borrowing is no longer your responsibility")
            app_id.put("contents", contents)

            val headings = JSONObject()
            headings.put("en", "Vehicle Borrow Cancelled")
            app_id.put("headings", headings)


            val wr = OutputStreamWriter(con.outputStream)
            wr.write(app_id.toString())
            wr.flush()


            //display what returns the POST request


            val HttpResult = con.responseCode
            if (HttpResult == HttpURLConnection.HTTP_OK) {
                logger.info("Method \"{}\" UserID \"{}\" ", "Send Notification", user.id)

            } else {
                logger.warn("Method \"{}\" UserID \"{}\" ", "Send Notification", user.id)
                System.out.println(con.responseMessage)
            }
        } catch (e: Exception) {
        } finally {
            con!!.disconnect()
        }
    }
}