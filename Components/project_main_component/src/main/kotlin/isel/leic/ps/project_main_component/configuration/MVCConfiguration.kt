package isel.leic.ps.project_main_component.configuration

import isel.leic.ps.project_main_component.resolvers.AuthArgumentResolver
import isel.leic.ps.project_main_component.security.WebSecurityConfig
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Import
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@Configuration
class MVCConfiguration : WebMvcConfigurer {

    override fun addArgumentResolvers(resolvers: MutableList<HandlerMethodArgumentResolver>) {
        //resolvers.add(new QueryStringArgumentResolver());
        resolvers.add(AuthArgumentResolver())
    }


    override fun addCorsMappings(registry: CorsRegistry) {

        registry.addMapping("/**")
                .allowedOrigins("*")
                .allowedMethods("*")
    }

}
