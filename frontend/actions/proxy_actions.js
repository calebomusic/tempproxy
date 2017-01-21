import fetch from 'isomorphic-fetch';
import { hashHistory } from 'react-router';

export const FETCH_PROXY = 'FETCH_PROXY';
export const REQUEST_PROXY = 'REQUEST_PROXY';
export const RECEIVE_PROXY = 'RECEIVE_PROXY';
export const CREATE_PROXY = 'CREATE_PROXY';

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
    dispatch(requestProxy(id));
    return fetch(`/api/proxies/${id}`)
      .then(response => response.json())
      .then(proxy => dispatch(recieveProxy(proxy)))
      .catch(error => console.log(error));
  }
}

export function createProxy(proxy) {
  return function(dispatch) {
    return fetch(`/api/proxies/`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        proxy
      })})
        .then(response => response.json())
        .then(proxy => dispatch(recieveProxy(proxy)))
        .catch(error => console.log(error))
  }
}
