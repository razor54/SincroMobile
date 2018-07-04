package isel.leic.ps.project_main_component.configuration

import isel.leic.ps.project_main_component.resolvers.AuthArgumentResolver
import org.springframework.context.annotation.Configuration
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport

@Configuration
class MVCConfiguration : WebMvcConfigurationSupport() {

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
