Api Documentation
=================
Api Documentation

**Version:** 1.0

**Terms of service:**  
urn:tos


**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

### /
---
##### ***GET***
**Summary:** getHomePage

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | string |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /api/sincro/event
---
##### ***POST***
**Summary:** addEvent

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| event | body | event | Yes | [Event](#event) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Event](#event) |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

##### ***PUT***
**Summary:** updateEvent

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| event | body | event | Yes | [Event](#event) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /error
---
##### ***GET***
**Summary:** error

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

##### ***POST***
**Summary:** error

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

##### ***PUT***
**Summary:** error

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

##### ***DELETE***
**Summary:** error

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 204 | No Content |
| 401 | Unauthorized |
| 403 | Forbidden |

##### ***OPTIONS***
**Summary:** error

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 204 | No Content |
| 401 | Unauthorized |
| 403 | Forbidden |

##### ***PATCH***
**Summary:** error

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | object |
| 204 | No Content |
| 401 | Unauthorized |
| 403 | Forbidden |

### /event
---
##### ***PUT***
**Summary:** updateEvent

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| event | body | event | Yes | [Event](#event) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /event/payment
---
##### ***POST***
**Summary:** payEvent

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| event | body | event | Yes | [Event](#event) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Event](#event) |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /history
---
##### ***GET***
**Summary:** getHistory

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [History](#history) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /login
---
##### ***POST***
**Summary:** loginUser

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | user | Yes | [User](#user) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [AuthenticatedUser](#authenticateduser) |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /register
---
##### ***POST***
**Summary:** createNewUser

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | user | Yes | [User](#user) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [AuthenticatedUser](#authenticateduser) |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /user
---
##### ***POST***
**Summary:** addUser

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | user | Yes | [User](#user) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /user/event
---
##### ***POST***
**Summary:** getEvent

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| user | body | user | Yes | [User](#user) |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Event](#event) ] |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /user/{email}
---
##### ***GET***
**Summary:** getUserByEmail

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| email | path | email | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /validate
---
##### ***GET***
**Summary:** validateToken

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| authorization | header | authorization | Yes | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [User](#user) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/
---
##### ***GET***
**Summary:** getUserVehicles

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Vehicle](#vehicle) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/borrow/requests
---
##### ***GET***
**Summary:** getBorrowRequests

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [DelegateRequest](#delegaterequest) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/borrowing
---
##### ***GET***
**Summary:** getBorrowingVehicles

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [DelegatedVehicle](#delegatedvehicle) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/delegate
---
##### ***POST***
**Summary:** delegatePlate

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| request | body | request | Yes | [DelegateRequest](#delegaterequest) |
| auth | query | auth | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/delegate/requests
---
##### ***GET***
**Summary:** getDelegateRequests

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [DelegateRequest](#delegaterequest) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/delegate/response
---
##### ***POST***
**Summary:** handleDelegation

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| delegateResponse | body | delegateResponse | Yes | [DelegateResponse](#delegateresponse) |
| auth | query | auth | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/delegate/{vehicleId}/request/cancel
---
##### ***POST***
**Summary:** cancelDelegationRequest

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| vehicleId | path | vehicleId | Yes | string |
| auth | query | auth | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/delegated
---
##### ***GET***
**Summary:** getDelegatedVehicles

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Vehicle](#vehicle) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/delegated/{vehicleId}/cancel
---
##### ***POST***
**Summary:** cancelDelegation

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| vehicleId | path | vehicleId | Yes | string |
| auth | query | auth | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/subscribe
---
##### ***POST***
**Summary:** subscribeVehicle

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| vehicle | body | vehicle | Yes | [Vehicle](#vehicle) |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/subscribed/
---
##### ***GET***
**Summary:** getSubscribedVehicles

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [ [Vehicle](#vehicle) ] |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/{vehicleId}/info
---
##### ***GET***
**Summary:** getVehicle

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| vehicleId | path | vehicleId | Yes | string |
| auth | query | auth | No | string |

**Responses**

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | OK | [Vehicle](#vehicle) |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### /vehicles/{vehicleId}/unsubscribe
---
##### ***POST***
**Summary:** unsubscribeVehicle

**Parameters**

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ---- |
| vehicleId | path | vehicleId | Yes | string |
| auth | query | auth | No | string |

**Responses**

| Code | Description |
| ---- | ----------- |
| 200 | OK |
| 201 | Created |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |

### Models
---

### AuthenticatedUser  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| token | [Token](#token) |  | Yes |
| user | [User](#user) |  | Yes |

### DelegateRequest  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | No |
| ownerId | integer |  | No |
| plate | string |  | Yes |
| userBorrowId | integer |  | No |

### DelegateResponse  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| accept | boolean |  | No |
| plate | string |  | Yes |
| requestId | integer |  | No |
| userBorrowId | integer |  | No |

### DelegatedVehicle  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id | integer |  | Yes |
| plate | string |  | Yes |
| userBorrowId | integer |  | Yes |

### Event  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| date | dateTime |  | Yes |
| driverId | integer |  | No |
| gpsLatitude | string |  | Yes |
| gpsLongitude | string |  | Yes |
| id | integer |  | No |
| location | string |  | Yes |
| plate | string |  | Yes |
| state | string |  | Yes |
| verified | boolean |  | No |

### History  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| actionId | string |  | Yes |
| date | dateTime |  | Yes |
| driverId | integer |  | Yes |
| id | integer |  | Yes |
| state | string |  | Yes |

### ModelAndView  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| empty | boolean |  | No |
| model | object |  | No |
| modelMap | object |  | No |
| reference | boolean |  | No |
| status | string |  | No |
| view | [View](#view) |  | No |
| viewName | string |  | No |

### Token  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| access_token | string |  | Yes |
| expires_in | string |  | Yes |
| id_token | string |  | Yes |
| scope | string |  | Yes |
| token_type | string |  | Yes |

### User  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| email | string |  | Yes |
| id | integer |  | No |
| name | string |  | Yes |
| password | string |  | Yes |
| playerId | string |  | No |

### Vehicle  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| delegateState | string |  | Yes |
| ownerId | integer |  | Yes |
| plate | string |  | Yes |
| registryDate | dateTime |  | Yes |
| subscribed | boolean |  | Yes |

### View  

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| contentType | string |  | No |