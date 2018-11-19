import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Contacts table. See pages/ListContacts.jsx. */
class MapMarker extends React.Component {

  /**
   * Checks to see if the Map Marker is valid to be displayed. Non-valid Markers are: Resolved, Declined, and Duplicate.
   * @returns {boolean} true if valid, otherwise false.
   */
  isValid() {
    switch (this.props.issue.status) {
      case 'Resolved':
        return false;
      case 'Declined':
        return false;
      case 'Duplicate':
        return false;
      default:
        return true;
    }
  }

  render() {
    const pos = [this.props.issue.lat, this.props.issue.long];

    let iconUrl;
    switch (this.props.issue.status) {
      case 'Open':
        iconUrl = 'https://res.cloudinary.com/dry4py4wt/image/upload/v1542591652/icon.svg';
        break;
      case 'Acknowledged':
        break;
      case 'In Progress':
        break;
      case 'Resolved':
        break;
      default:
        break;
    }
    const issueIcon = L.icon({
      iconUrl: iconUrl,
      iconSize: [50, 82],
    });

    return (
        this.isValid() ?
            (<Marker position={pos} icon={issueIcon}>
              <Popup>
                {this.props.issue.title}
                <br/>
                {this.props.issue.createdAt}
                {/* TODO: Format the date to be prettier, ideally this should be done server-side. */}
              </Popup>
            </Marker>)
            : ''
    );
  }
}

/** Require a document to be passed to this component. */
MapMarker.propTypes = {
  issue: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(MapMarker);
