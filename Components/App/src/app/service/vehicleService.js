/* global fetch:false */
import networkSettings from '../config/serverConnectionSettings';


function getUserVehicles(token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/`, data);
}

function getSubscribedVehicles(token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/subscribed/`, data);
}

function getDelegatedVehicles(token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/delegated/`, data);
}

function getBorrowedVehicles(token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/borrowing/`, data);
}


function delegateVehicle(token, state) {
  const url = `${networkSettings.homepage}/vehicles/delegate/`;
  const data = {
    body: JSON.stringify({
      plate: state.plate,
      ownerId: state.ownerId,
      userBorrowId: state.borrowId,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(url, data);
}

function getVehicle(token, plate) {
  const url = `${networkSettings.homepage}/vehicles/${plate}/info/`;
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(url, data);
}

function unsubscribeVehicles(token, plate) {
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/${plate}/unsubscribe`, data);
}

function cancelBorrowVehicle(token, plate) {
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/delegated/${plate}/cancel`, data);
}

function cancelBorrowRequest(token, plate) {
  const data = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/delegate/${plate}/request/cancel`, data);
}


function subscribeVehicle(token, state) {
  const data = {
    method: 'POST',
    body: JSON.stringify({
      plate: state.plate,
      ownerId: state.ownerId,
      registryDate: state.date,
      subscribed: true,
      delegateState: 'False',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/subscribe`, data);
}

function delegateResponse(token, accept, state) {
  const url = `${networkSettings.homepage}/vehicles/delegate/response`;
  const data = {
    body: JSON.stringify({
      plate: state.plate,
      userBorrowId: state.request.userBorrowId,
      requestId: state.request.id,
      accept,
    }),
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(url, data);
}


function getVehicleRequests(token) {
  const data = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `${token.token_type} ${token.access_token}`,
    },
  };

  return fetch(`${networkSettings.homepage}/vehicles/borrow/requests/`, data);
}


export {
  getVehicleRequests,
  delegateResponse,
  subscribeVehicle,
  cancelBorrowVehicle,
  unsubscribeVehicles,
  getVehicle,
  delegateVehicle,
  getBorrowedVehicles,
  getDelegatedVehicles,
  getSubscribedVehicles,
  getUserVehicles,
  cancelBorrowRequest,
};
