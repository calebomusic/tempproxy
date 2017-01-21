import React from 'react';
import { Provider } from 'react-redux';
import {
  Router, Route,
  hashHistory, IndexRoute,
  withRouter } from 'react-router';
import Landing from './landing/landing_container';
import ProxyContainer from './proxy/proxy_container';

import { fetchProxy } from '../actions/proxy_actions';
import { fetchTempLinks } from '../actions/temp_link_actions';

const Root = ({store}) => {
  const _fetchProxy = (ownProps) => {
    if (!store.getState().proxy.id) {
      const proxyId = ownProps.params.proxyId;
      store.dispatch(fetchProxy(proxyId));
      store.dispatch(fetchTempLinks(proxyId));
    }
  }

  return(
    <Provider store={store}>
      <Router history={hashHistory}>
        <Route path='/'
               component={Landing}></Route>
             <Route path='/proxies/:proxyId'
                    component={ProxyContainer}
                    onEnter={_fetchProxy}></Route>
      </Router>
    </Provider>
  )
}

export default Root;
