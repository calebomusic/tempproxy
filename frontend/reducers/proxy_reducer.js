import {
  RECEIVE_PROXY
} from '../actions/proxy_actions'
import { merge } from 'lodash'

const ProxyReducer = (state = {}, action) => {
  let newState = merge({}, state)
  switch (action.type) {
    case RECEIVE_PROXY:
      return action.proxy
    default:
      return newState
  }
}

export default ProxyReducer
