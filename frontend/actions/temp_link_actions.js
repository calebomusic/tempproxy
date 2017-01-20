import fetch from 'isomorphic-fetch';

export const FETCH_TEMP_LINKS = 'FETCH_TEMP_LINK';
export const REQUEST_TEMP_LINKS = 'FETCH_TEMP_LINK';
export const RECEIVE_TEMP_LINKS = 'FETCH_TEMP_LINK';

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
    dispatch(requestTempLinks);
    return fetch(`/api/proxies/${proxyId}/temp_links`)
      .then(response => response.json())
      .then(tempLinks => dispatch(receiveTempLinks(tempLinks)))
      .catch(error => console.log(error));
  }
}
