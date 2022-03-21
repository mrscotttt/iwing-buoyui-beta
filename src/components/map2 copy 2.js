/*import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import "./stylemap.css";
import MyMarker from "./MyMarker";
import Polyline from './Polyline'

class Mymap2 extends React.Component {

  // Constructor 
  constructor (props) {
      super(props)
      this.state = {
        mapsLoaded: false,
        map: null,
        maps: null
      };
      this.state = {
        items: [],
        DataisLoaded: false
      };
    }

  // ComponentDidMount is used to
  // execute the code 
  componentDidMount() {
      fetch("/s")
          .then((res) => res.json())
          .then((json) => {
              this.setState({
                  items: json,
                  DataisLoaded: true
              });
          })
  }

  onMapLoaded (map, maps) {
    this.fitBounds(map, maps)
    this.setState({
      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
    })
  }

  fitBounds (map, maps) {
    var bounds = new maps.LatLngBounds()
    for (let marker of this.props.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  afterMapLoadChanges () {
    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={this.props.markers} />
      </div>
    )
  }

  render () {
    const { DataisLoaded, items } = this.state;
    return (
      <GoogleMap
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyCb4S_KjmOucIrH_SUvZG1RloYhTX34Pn4",
          language: "TH",
          region: "TH"
        }}
        style={{height: '100vh', width: '100%'}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}
      >
      {items.map((item) => ( 
          <MyMarker key = {item.id} lat={item.lat} lng={item.long} text={'YYZ'} />
      ))}
      </GoogleMap>
    )
  }
}

Mymap2.defaultProps = {
  markers: [],
  center: [13.836887,100.57644],
  zoom: 20
}

export default Mymap2

/*
markers: [
  {lat: 58.681583, lng: -79.61146},
  {lat: 53.42728, lng: -6.24357},
  {lat: 43.681583, lng: -79.61146}
],

<Marker text={'AYZ'} lat={58.681583} lng={-79.61146} />
<Marker text={'DUB'} lat={53.42728} lng={-6.24357} />
<MyMarker key={'YYZ'} lat={43.681583} lng={-79.61146} text={'YYZ'} />
{this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}*/