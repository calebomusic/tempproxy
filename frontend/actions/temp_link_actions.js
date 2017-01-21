import fetch from 'isomorphic-fetch';

export const FETCH_TEMP_LINKS = 'FETCH_TEMP_LINKS';
export const REQUEST_TEMP_LINKS = 'REQUEST_TEMP_LINKS';
export const RECEIVE_TEMP_LINKS = 'RECEIVE_TEMP_LINKS';

export const receiveTempLinks = (tempLinks) => {
  return {
    type: RECEIVE_TEMP_LINKS,
    tempLinks
  }
}

function requestTempLinks(proxyId) {
  return {
    type: REQUEST_TEMP_LINKS,
    proxyId
  }
}

export function fetchTempLinks(proxyId) {
  return (dispatch) => {
    dispatch(requestTempLinks());
    return fetch(`/api/proxies/${proxyId}/temp_links`)
      .then(response => response.json())
      .then(tempLinks => {
        dispatch(receiveTempLinks(tempLinks))
      }
        )
      .catch(error => console.log(error));
  }
}

export function createTempLink(proxyId) {
  return (dispatch) => {
    return fetch(`api/proxies/${proxyId}/temp_links`, {
        method: "POST",
        credentials: 'same-origin',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': document.getElementsByName('csrf-token')[0].getAttribute('content')
        },
        body: JSON.stringify({
          proxyId
        })})
      .then(() => dispatch(fetchTempLinks(proxyId)))
      .catch(error => console.log(error))
  }
}

export function deleteTempLink(id, proxyId) {
  return (dispatch) => {
    return fetch(`api/temp_links/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          id
        })})
      .then(() => dispatch(fetchTempLinks(proxyId)))
      .catch(error => console.log(error))
  }
}
