package isel.leic.ps.project_main_component.security

import org.springframework.boot.convert.ApplicationConversionService.configure
import com.auth0.spring.security.api.JwtWebSecurityConfigurer;
import isel.leic.ps.project_main_component.service.EventService
import org.slf4j.Logger
import org.slf4j.LoggerFactory
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
@PropertySource(ignoreResourceNotFound=true,value= ["classpath:auth0.properties"])
class WebSecurityConfig : WebSecurityConfigurerAdapter() {
    @Value("\${auth0.apiAudience}")
    private lateinit var audience: String //= "sincro-mobile-auth"

    @Value("\${auth0.issuer}")
    private lateinit var issuer: String // = "https://razor54.eu.auth0.com"

    var logger : Logger = LoggerFactory.getLogger(WebSecurityConfig::class.simpleName)

    //@Throws(Exception::class)
    override fun configure(http: HttpSecurity) {

        JwtWebSecurityConfigurer
                .forRS256(audience, issuer)
                .configure(http)
                .authorizeRequests()
                //.cors().and().csrf().disable().authorizeRequests()

                //.antMatchers(HttpMethod.POST,"/**").authenticated()
                .antMatchers("/").permitAll()
                .antMatchers(HttpMethod.POST,"/event").permitAll()
                .antMatchers(HttpMethod.POST,"/login").permitAll()
                .antMatchers(HttpMethod.POST,"/register").permitAll()
                .anyRequest().authenticated()
    }
}