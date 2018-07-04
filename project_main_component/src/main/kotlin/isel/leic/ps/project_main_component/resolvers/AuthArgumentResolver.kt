package isel.leic.ps.project_main_component.resolvers


import isel.leic.ps.project_main_component.service.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.core.MethodParameter
import org.springframework.lang.Nullable
import org.springframework.web.bind.support.WebDataBinderFactory
import org.springframework.web.context.request.NativeWebRequest
import org.springframework.web.method.support.HandlerMethodArgumentResolver
import org.springframework.web.method.support.ModelAndViewContainer

import javax.servlet.http.HttpServletRequest

class AuthArgumentResolver : HandlerMethodArgumentResolver {


    override fun supportsParameter(parameter: MethodParameter): Boolean {
        return parameter.parameterType == String::class.java
    }

    @Throws(Exception::class)
    override fun resolveArgument(parameter: MethodParameter, @Nullable mavContainer: ModelAndViewContainer?, webRequest: NativeWebRequest, @Nullable binderFactory: WebDataBinderFactory?): Any? {


        val auth = webRequest.getNativeRequest(HttpServletRequest::class.java)?.getHeader("authorization")


        return auth
    }
}
