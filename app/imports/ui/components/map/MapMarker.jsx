import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Contacts table. See pages/ListContacts.jsx. */
class MapMarker extends React.Component {
  render() {
    const pos = [this.props.issue.lat, this.props.issue.long];
    const openIssueIcon = L.icon({
      iconUrl: 'https://res.cloudinary.com/dry4py4wt/image/upload/v1542591652/icon.svg',
      iconSize: [50, 82],
    });

    switch (this.props.issue.status) {
      case 'Open':
        return (
            <Marker position={pos} icon={openIssueIcon}>
              <Popup>
                {this.props.issue.title}
                <br/>
                {this.props.issue.createdAt}
              </Popup>
            </Marker>
        );
      default:
        return (
            <Marker position={pos} icon={openIssueIcon}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
        );
    }
  }
}

/** Require a document to be passed to this component. */
MapMarker.propTypes = {
  issue: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MapMarker);
