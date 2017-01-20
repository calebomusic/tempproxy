import fetch from 'isomorphic-fetch';

export const FETCH_PROXY = 'FETCH_PROXY';
export const REQUEST_PROXY = 'REQUEST_PROXY';
export const RECEIVE_PROXY = 'RECEIVE_PROXY';

export const recieveProxy = (proxy) => {
  return {
    type: RECEIVE_PROXY,
    proxy
  }
}

export function requestProxy(id) {
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
        dispatch(recieveProxy(proxy))
      })
      .catch(error => console.log(error))
  }
}
