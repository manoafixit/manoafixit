import React from 'react';
// import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
// import { _ } from 'meteor/underscore';
import { Issues } from '../../api/IssuesCollection/IssuesCollection';

// const icon = L.icon({
//   iconUrl: 'leaf-green.png',
//   shadowUrl: 'leaf-shadow.png',
//
//   iconSize: [38, 95], // size of the icon
//   shadowSize: [50, 64], // size of the shadow
//   iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
//   shadowAnchor: [4, 62], // the same for the shadow
//   popupAnchor: [-3, -76], // point from which the popup should open relative to the iconAnchor
// });

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
          <Marker position={centerPos}>
            <Popup>
              A pretty CSS3 popup. <br/> Easily customizable.
            </Popup>
          </Marker>
        </Map>
    );
  }
}

export default withTracker(() => {
  const sub = Meteor.subscribe('IssuesCollection');
  return {
    issues: Issues.getCollectionDocuments(),
    ready: sub.ready(),
  };
})(MapPage);
