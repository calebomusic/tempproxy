import { connect } from 'react-redux';

import Landing from './landing';
import { createProxy } from '../../actions/proxy_actions'

const mapStateToProps = state => (
  {
    proxy: state.proxy
  }
)

export default connect(
  mapStateToProps,
  {
    createProxy
  }
)(Landing);
