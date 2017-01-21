import React from 'react';
import { withRouter } from 'react-router';

class Proxy extends React.Component {
  constructor(props) {
    super(props)

    this.renderTempLinks = this.renderTempLinks.bind(this);
    this.createTempLink = this.createTempLink.bind(this);
    this.handleVisit = this.handleVisit.bind(this);
  }

  componentDidMount() {

  }

  handleVisit(link) {
    return () => this.props.updateLinkClicks(link);
  }

  deleteTempLink(id){
    return () => this.props.deleteTempLink(id);
  }

  renderTempLinks() {
    const columnHeaders = <tr>
                            <td>URL</td>
                            <td>Time Created</td>
                            <td>Clicks</td>
                            <td>Details</td>
                            <td>Delete</td>
                          </tr>

    const tempLinks = this.props.tempLinks.map( (link, i) => (
      <tr key={i}>
        <td>
          <a href={`/temp_links/${link.slug}`}>{link.slug}</a>
        </td>
        <td>
          created at {link.created_at}
        </td>
        <td>
          {link.clicks}
        </td>
        <td>
          ?
        </td>
        <td>
          <button onClick={this.props.deleteTempLink(link.id)}>Delete</button>
        </td>
      </tr>)
    )

    return(
      <table>
        <tbody>
          {columnHeaders}
          {tempLinks}
        </tbody>
      </table>
    )
  }

  createTempLink() {
    return () => {
      const proxyId = this.props.proxy.id;
      this.props.createTempLink(proxyId);
    }
  }

  render() {
    return(
      <section className="proxy-container">
        <header>
          {this.props.proxy.lifespan} minutes proxy for
          <a href={this.props.proxy.destination_url}>{this.props.proxy.destination_url}</a>
        </header>
        <section>
          Your proxy links:
        </section>
        {this.renderTempLinks()}
        <section>
        </section>
        <section>
          <button onClick={this.createTempLink()}>New Link</button>
        </section>
      </section>
    )
  }
}


export default withRouter(Proxy);

// onClick={this.handleVisit(link)
