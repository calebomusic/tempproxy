import { combineReducers } from 'redux';
import ProxyReducer from './proxy_reducer';
import TempLinksReducer from './temp_links_reducer';

const RootReducer = combineReducers(
  {
    proxy: ProxyReducer,
    tempLinks: TempLinksReducer
  }
)

export default RootReducer;
