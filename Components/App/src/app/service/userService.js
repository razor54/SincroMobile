/* global fetch:false */
import networkSettings from '../config/serverConnectionSettings';


function getUser(token) {
  const myInit = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };
  return fetch(`${networkSettings.homepage}/validate/`, myInit);
}

export { getUser };
