import { connect } from 'react-redux';

import Proxy from './proxy';
import { createTempLink, deleteTempLink } from '../../actions/temp_link_actions';

const mapStateToProps = (state) => (
  {
    proxy: state.proxy,
    tempLinks: state.tempLinks
  }
)

export default connect(
  mapStateToProps,
  {
    createTempLink,
    deleteTempLink
  }
)(Proxy);
