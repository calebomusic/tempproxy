import React from 'react';
import { hashHistory } from 'react-router';

class Landing extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      lifespan: 5,
      destination_url: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(props) {
    const proxyId = props.proxy.id;
    if (proxyId) {
      hashHistory.push(`/proxies/${proxyId}`);
    }
  }

  handleChange(value) {
    return (e) => this.setState({ [value]: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createProxy(this.state);
  }

  render() {
    return(
      <section className="root-container">
        <header className="root-header">
          Create Temporary Proxy
        </header>
        <form className="root-form"
              onSubmit={this.handleSubmit}>
          <label>URL
            <input type="text"
                   value={this.state.url}
                   onChange={this.handleChange('destination_url')} />
          </label>
          <label>Minutes
            <select value={this.state.lifespan}
                    onChange={this.handleChange('lifespan')}>
              <option value='5'>5</option>
              <option value='10'>10</option>
              <option value='15'>15</option>
              <option value='30'>30</option>
              <option value='60'>60</option>
              <option value='120'>120</option>
              <option value='180'>180</option>
            </select>
          </label>
          <input type="submit"
                 value="Submit"
                 readOnly={true} />
        </form>
      </section>
    )
  }
}

export default Landing;
