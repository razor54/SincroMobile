package isel.ps.g41.sincromobile.plateverifier

import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class MVCConfiguration : WebMvcConfigurer {

    override fun addCorsMappings(registry: CorsRegistry) {

        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
    }

}
