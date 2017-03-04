import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

import { fetchProxy, createProxy } from './actions/proxy_actions';
import { fetchTempLinks } from './actions/temp_link_actions'

// import { handleRelativeLinks } from './util/assets'

document.addEventListener("DOMContentLoaded", () => {
  const store = configureStore();

  const root = document.getElementById('root');
  if (root) {
    ReactDOM.render(<Root store={store}></Root>, root);
  }

  if(window.destinationUrl) {
    // handleRelativeLinks(window.destinationUrl);
  }

  function handleRelativeLinks(url) {
    let queue = [ document ];

    while(queue.length > 0) {
      let curr = queue.shift();

      if (curr.src) {
        rewriteLinkOrSource(element, 'src', sourceUrl);
      }

      if(curr.href) {
        rewriteLinkOrSource(element, 'href', sourceUrl);
      }

      for(let child of curr.children) {
        queue.push(curr);
      }
    }
  }

  function rewriteLinkOrSource(element, type, url) {
    let currUrl = element[type],
        hostname = window.hostname;

    for(let i = 0; i < currUrl.length - hostname.length; i ++ ) {
      let j = i + j;

      if (currUrl.slice(i, j) === hostname) {
        break;
      }
    }

    let newUrl = sourceUrl + currUrl.slice(j);
    console.log(newUrl);
    element.setAttribute(type, newUrl);
  }
  // for testing
  window.store = store;
  window.state = () => store.getState();
  window.fetchProxy = (id) => store.dispatch(fetchProxy(id))
  window.createProxy = (proxy) => store.dispatch(createProxy(proxy))
  window.fetchTempLinks = (id) => store.dispatch(fetchTempLinks(id))
});
