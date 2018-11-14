import 'leaflet/dist/leaflet.css';
import React from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

export default class MapPage extends React.Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }

  render() {
    const style = {
      height: '600px',
    };

    const position = [this.state.lat, this.state.lng];
    return (
        <Map className="map" center={position} zoom={this.state.zoom} style={style}>
          <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </Map>
    );
  }
}
