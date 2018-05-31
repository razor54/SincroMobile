package isel.leic.ps.project_main_component

import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.PropertySource
import org.springframework.context.annotation.PropertySources

@SpringBootApplication
class ProjectMainComponentApplication

fun main(args: Array<String>) {
    runApplication<ProjectMainComponentApplication>(*args)
}
