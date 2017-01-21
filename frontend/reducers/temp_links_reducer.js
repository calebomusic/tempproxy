import {
  RECEIVE_TEMP_LINKS
} from '../actions/temp_link_actions';
import { merge } from 'lodash';

const TempLinksReducer = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TEMP_LINKS:
      return action.tempLinks;
    default:
      return [];
  }
}

export default TempLinksReducer;
