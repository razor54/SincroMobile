package isel.leic.ps.project_main_component.control

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.util.concurrent.atomic.AtomicLong

@RestController
class EventController {

    @GetMapping("/")
    fun getHomePage(): String {
        return "ola"
    }

    @PostMapping("/event")
    fun addEvent(){

    }

    val counter = AtomicLong()

    @GetMapping("/greeting")
    fun greeting(@RequestParam(value = "name", defaultValue = "World") name: String) =
            Greeting(counter.incrementAndGet(), "Hello, $name")




}

data class Greeting(val id: Long, val content: String)