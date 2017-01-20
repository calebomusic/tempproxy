import { combineReducers } from 'redux';
import ProxyReducer from './proxy_reducer';

const RootReducer = combineReducers(
  {
    proxy: ProxyReducer
  }
)

export default RootReducer
