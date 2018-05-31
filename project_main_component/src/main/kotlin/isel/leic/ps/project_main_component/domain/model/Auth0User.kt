package isel.leic.ps.project_main_component.domain.model

import java.util.*

class Auth0User() {

/*
*
*    {
*      "email_verified": false,
*      "email": "test.account@userinfo.com",
*      "updated_at": "2016-12-05T15:15:40.545Z",
*      "name": "test.account@userinfo.com",
*      "picture": "https://s.gravatar.com/avatar/dummy.png",
*      "user_id": "auth0|58454...",
*      "nickname": "test.account",
*      "created_at": "2016-12-05T11:16:59.640Z",
*      "sub": "auth0|58454..."
*    }
*
*
* */

    lateinit var email: String

    var email_verified: Boolean = false

    lateinit var updated_at: Date

    lateinit var name: String

    lateinit var picture: String

    lateinit var user_id: String

    lateinit var nickname: String

    lateinit var created_at: Date

    lateinit var sub: String

}