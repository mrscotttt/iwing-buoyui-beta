import {InputGroup,Table,Badge,Navbar,Nav,Form,Button,FormControl,Card,Container,Row,Col,DropdownButton,Dropdown,Select,Option,Jumbotron} from 'react-bootstrap';
import React, { Component , useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import "./stylemap.css";
import MyMarker from "./MyMarker";
import Polyline from './Polyline'
import Headbar from './headbar';
import Bottom from './bottom';
import * as Icon from 'react-bootstrap-icons';
import "./style.css";


class Mymap2 extends React.Component {

  constructor (props) {
      super(props)
      this.state = {
        mapsLoaded: false,
        map: null,
        maps: null,
        items: [],
        f: 0,
        DataisLoaded: false,
        b: "choose",
        cd: "day",
        cm: "month",
        cy: "year",
      };
    }

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


  afterMapLoadChanges() {
    let itm = this.state.items;
    const mypath = [];
    let cnt = 0;
    for (let i = 0; i < itm.length; i++) {
      if(itm[i].buoyid==this.state.b&&
        itm[i].dd==this.state.cd&&
        itm[i].mm==this.state.cm&&
        itm[i].yy==this.state.cy
        ){
        mypath[cnt]={lat: itm[i].lat, lng: itm[i].long, count: itm[i].count};
        cnt = cnt + 1
      }
    } 
    
    function sortByProperty(property){  
      return function(a,b){  
         if(a[property] > b[property])  
            return 1;  
         else if(a[property] < b[property])  
            return -1;  
     
         return 0;  
      }  
    }
    mypath.sort(sortByProperty('count'));

    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={mypath}
        />
      </div>
    );
  }
  
  render () {
    const { itemsisLoaded, items } = this.state;
    const Buoylist = [...new Map(items.map(item =>[item.buoyid, item])).values()];
    const dlist = [...new Map(items.map(item =>[item.dd, item])).values()];
    const mlist = [...new Map(items.map(item =>[item.mm, item])).values()];
    const ylist = [...new Map(items.map(item =>[item.yy, item])).values()];

    return (
      <div className="App-main">
      <Headbar></Headbar>
      <Row>
          <Col xs="1"></Col>
          <Col>
            <br/>
            <Card className="dark" >
            <Card.Header as="h5">
              <Row>
              <Col xs="1.5">
              <Button variant="warning" size="md">Buoy Data</Button>
              </Col>
              <Col xs="2">
                <InputGroup >
                <InputGroup.Prepend>
                <InputGroup.Text><span classname = "textbox">Buoyid</span></InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                  type="string" 
                  required 
                  value={this.state.b}
                  onChange={(e)=>this.setState({b: e.target.value})}
                  as="select"
                  >
                    <option>{this.state.b}</option>
                    {Buoylist.map( el=> (<option key={el.id}>{el.buoyid}</option>))}
                </Form.Control>
                </InputGroup>
              </Col>
              <Col xs="4">
                <InputGroup className="mb-3">
                <InputGroup.Prepend>
                <InputGroup.Text>Date</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control 
                  type="string"  
                  required 
                  value={this.state.cd}
                  onChange={(e)=>this.setState({cd: e.target.value})}
                  as="select"
                  >
                    <option>{this.state.cd}</option>
                    {dlist.map( el=> (<option key={el.id}>{el.dd}</option>))}
                </Form.Control>
                <Form.Control 
                  type="string" 
                  required 
                  value={this.state.cm}
                  onChange={(e)=>this.setState({cm: e.target.value})}
                  as="select"
                  >
                    <option>{this.state.cm}</option>
                    {mlist.map( el=> (<option key={el.id}>{el.mm}</option>))}
                </Form.Control>
                
                <Form.Control 
                  type="string" 
                  required 
                  value={this.state.cy}
                  onChange={(e)=>this.setState({cy: e.target.value})}
                  as="select"
                  >
                    <option>{this.state.cy}</option>
                    {ylist.map( el=> (<option key={el.id}>{el.yy}</option>))}
                </Form.Control>
                </InputGroup>
              </Col>
              <Col xs="3">
              </Col>
              <Col xs="0.5">
              <Button variant="dark" href="/main" size="sm">
              <div class="wrapper" href="/map">
                <div class="icon instagram" href="/map">
                  <div class="tooltip" href="/map">Chart</div>
                  <span href="/map"><i class="fab fa-instagram" href="/map" ><Icon.BarChartLineFill href="/chart"/></i></span>
                </div>
              </div>
              </Button>
              </Col>
              <Col xs="0.5">
              <Button variant="dark" href="/energy" size="sm">
              <div class="wrapper" href="/map">
                <div class="icon youtube" href="/map">
                  <div class="tooltip" href="/map">Energy</div>
                  <span href="/map"><i class="fab fa-youtube" href="/map" ><Icon.LightningChargeFill/></i></span>
                </div>
              </div>
              </Button>
              </Col>
              <Col xs="0.5">
              <Button variant="dark" href="/map" size="sm">
              <div class="wrapper" href="/map">
                <div class="icon facebook" href="/map">
                  <div class="tooltip" href="/map">Map</div>
                  <span href="/map"><i class="fab fa-facebook" href="/map" ><Icon.GeoAltFill href="/map"/></i></span>
                </div>
              </div>
              </Button>
              </Col>
              </Row>
            </Card.Header>
            </Card>
            <br/>
            <Card border="dark" className="App-main2">
            <GoogleMapReact
                  bootstrapURLKeys={{
                    // remove the key if you want to fork
                    key: "AIzaSyCb4S_KjmOucIrH_SUvZG1RloYhTX34Pn4",
                    language: "TH",
                    region: "TH"
                  }}
                  style={{height: '70vh', width: '100%'}}
                  defaultCenter={this.props.center}
                  defaultZoom={this.props.zoom}
                  onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}
                >
                {items.map((item) => ( 
                    <MyMarker 
                    key = {item.id} 
                    lat={item.lat} 
                    lng={item.long} 
                    text={item.buoyid} 
                    b={item.battery} 
                    temp={item.temp} 
                    ec={item.ec} 
                    day={item.dd+"/"+item.mm+"/"+item.yy} 
                    time={item.hh+":"+item.mn+":"+item.ss}
                    accr={item.ax+":"+item.ay+":"+item.az}
                    gyro={item.gx+":"+item.gy+":"+item.gz}
                    ></MyMarker>
                ))}
                
                {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
                </GoogleMapReact>
            </Card>
          </Col>
          <Col xs="1"></Col>
          </Row>
          <Bottom></Bottom>
      </div>
    )
  }
}

Mymap2.defaultProps = {
  markers: [{lat: 13.840666, lng: 100.575050},{lat: 13.840636, lng: 100.57555}],
  center: [13.836887,100.57644],
  zoom: 10
}

export default Mymap2

/*
Mymap2.defaultProps = {
  markers: [
    {lat: 13.836887, lng: 100.57644},
    {lat: 13.836887, lng: 100.57744},
    {lat: 13.836887, lng: 100.57844},
    {lat: 13.836887, lng: 100.57944}
  ],
  center: [13.836887,100.57644],
  zoom: 15
  /*{this.defaultProps.markers={lat: 13.836887, lng: 100.58044}}
}

for (let i = 0; i < items.length; i++) {
      var dict = {}
      if (items[i].buoyid==this.state.b 
          && items[i].dd==this.state.cd
          && items[i].mm==this.state.cm
          && items[i].yy==this.state.cy)
      {
        dict['lat'] = items[i].lat
        dict['lng'] = items[i].long
        dict['count'] = items[i].count
        pair[i] = dict
      }
    } 

        function sortByProperty(property){  
      return function(a,b){  
         if(a[property] > b[property])  
            return 1;  
         else if(a[property] < b[property])  
            return -1;  
     
         return 0;  
      }  
    }

    //path.sort(sortByProperty('count'));

*/
