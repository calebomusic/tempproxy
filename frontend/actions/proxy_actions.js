import fetch from 'isomorphic-fetch';

const FETCH_PROXY = 'FETCH_PROXY';
const REQUEST_PROXY = 'REQUEST_PROXY';
const RECEIVE_PROXY = 'RECEIVE_PROXY';

export const recieveProxy = (proxy) => {
  return {
    type: RECEIVE_PROXY,
    proxy
  }
}

function requestProxy(id) {
  return {
    type: REQUEST_PROXY,
    id
  }
}

export function fetchProxy(id) {
  return function(dispatch) {
    dispatch(requestProxy(id))
    return fetch(`/api/proxies/${id}`)
      .then(response => response.json())
      .then(proxy => {
        console.log(proxy);
        dispatch(recieveProxy(proxy))
      })
  }
}
