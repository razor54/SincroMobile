/* global fetch:false */
import networkSettings from '../config/serverConnectionSettings';


function responseConfirmEvent(token, event) {
  const data = {
    body: JSON.stringify(event),
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Authorization: `${token.token_type} ${token.access_token}` },
  };

  const path = `${networkSettings.homepage}/event`;

  return fetch(path, data);
}

function getEventList(token, state) {
  const data = {
    body: JSON.stringify({ id: state.id }),
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `${token.token_type} ${token.access_token}` },

  };
  return fetch(state.eventsUrl, data);
}

function payEvent(token, state) {
  // todo
}

export {
  payEvent,
  getEventList,
  responseConfirmEvent,
};
