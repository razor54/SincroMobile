package isel.leic.ps.project_main_component.domain.resource

import isel.leic.ps.project_main_component.domain.model.Token
import isel.leic.ps.project_main_component.domain.model.User


class AuthenticatedUser(val user: User, val token: Token)