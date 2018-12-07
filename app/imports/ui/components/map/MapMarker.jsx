import React from 'react';
import PropTypes from 'prop-types';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Link, withRouter } from 'react-router-dom';
import { Card, Label } from 'semantic-ui-react';
import { format } from 'date-fns';
import { STATUS } from '../../../api/IssuesCollection/IssueStatuses';

/** Renders a single row in the List Contacts table. See pages/ListContacts.jsx. */
class MapMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      iconUrl: '/images/mapmarkers/MarkerOpen.svg',
    };
  }

  /**
   * Checks to see if the Map Marker is valid to be displayed. Non-valid Markers are: Resolved, Declined, and Duplicate.
   * @returns {boolean} true if valid, otherwise false.
   */
  isValid() {
    switch (this.props.issue.status) {
      case `${STATUS.RESOLVED}`:
        return false;
      case `${STATUS.DUPLICATE}`:
        return false;
      default:
        return true;
    }
  }

  componentWillMount() {
    this.chooseIcon();
  }

  chooseIcon() {
    switch (this.props.issue.status) {
      case `${STATUS.OPEN}`:
        this.setState({ iconUrl: '/images/mapmarkers/MarkerOpen.svg' });
        break;
      case `${STATUS.ACKNOWLEDGED}`:
        this.setState({ iconUrl: '/images/mapmarkers/MarkerAckd.svg' });
        break;
      case `${STATUS.ONGOING}`:
        this.setState({ iconUrl: '/images/mapmarkers/MarkerProg.svg' });
        break;
      default:
        break;
    }
  }

  render() {
    const pos = [this.props.issue.lat, this.props.issue.long];

    const issueIcon = L.icon({
      iconUrl: this.state.iconUrl,
      iconSize: [50, 82], // size of the icon
      popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
    });

    const date = format(this.props.issue.createdAt, 'MMMM D, YYYY');

    const popupStyle = {
      whiteSpace: 'normal',
      wordWrap: 'break-word',
    };

    return (
        this.isValid() ?
            (<Marker position={pos} icon={issueIcon}>
              <Popup>
                <Card style={popupStyle}>
                  <Card.Content>
                    <Card.Header> {this.props.issue.title} </Card.Header>
                    <Card.Meta> {this.props.issue.owner} opened this issue on {date} </Card.Meta>
                    <Card.Description>
                      <Link to={`/issue/${this.props.issue._id}`}> Go to this Issue&apos;s page </Link>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    {this.props.issue.tags ? this.props.issue.tags.map((tag, index) => <Label key={index}
                                                                                              basic> {tag} </Label>)
                        : ''}
                  </Card.Content>
                </Card>
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
