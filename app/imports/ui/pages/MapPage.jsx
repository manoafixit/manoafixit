import React from 'react';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer } from 'react-leaflet';
import { Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Issues } from '../../api/IssuesCollection/IssuesCollection';
import MapMarker from '../components/map/MapMarker';

class MapPage extends React.Component {
  state = {
    issues: {
      location: {
        lat: 21.2969,
        long: -157.8171,
      },
      title: '',
    },
    zoom: 18,
  }

  render() {
// eslint-disable-next-line no-console
//     console.log(this.props.issues);
    return (this.props.ready) ? this.renderMap() : <Loader active>Fetching Map Data</Loader>;
  }

  renderMap() {
    const style = {
      height: '600px',
    };

    const centerPos = [21.2969, -157.8171];
    return (
        <Map className="map" center={centerPos} zoom={this.state.zoom} style={style}>
          <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            this.props.issues.map((issue, index) => <MapMarker key={index} issue={issue}/>)
          }
        </Map>
    );
  }
}

MapPage.propTypes = {
  issues: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    ready: sub.ready(),
  };
})(MapPage);
