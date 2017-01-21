import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

import { fetchProxy, createProxy } from './actions/proxy_actions.js';
import { fetchTempLinks } from './actions/temp_link_actions.js'

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();

  const root = document.getElementById('root');

  ReactDOM.render(<Root store={store}></Root>, root);

  // for testing
  window.store = store;
  window.state = () => store.getState();
  window.fetchProxy = (id) => store.dispatch(fetchProxy(id))
  window.createProxy = (proxy) => store.dispatch(createProxy(proxy))
  window.fetchTempLinks = (id) => store.dispatch(fetchTempLinks(id))
})
