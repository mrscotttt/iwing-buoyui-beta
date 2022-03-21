import React, { useState, useEffect } from 'react';
import "./stylemap.css";
import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";
import {Table,Badge,Navbar,Nav,Form,Button,FormControl,Card,Container,Row,Col,DropdownButton,Dropdown,Select,Option,Jumbotron} from 'react-bootstrap';
import Headbar from './headbar';
import Bottom from './bottom';
import * as Icon from 'react-bootstrap-icons';
import ReactTooltip from "react-tooltip";
import Polyline from './Polyline'

const distanceToMouse = (pt, mp) => {
  if (pt && mp) {
    return Math.sqrt(
      (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
    );
  }
};

export default function Mymap2() {
  const [product, setProduct] = useState([])
  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(product => setProduct(product))
      console.log(product)
  },[])

  return (
    <div className="App">
      <Headbar></Headbar>
      <GoogleMapReact
        bootstrapURLKeys={{
          // remove the key if you want to fork
          key: "AIzaSyCb4S_KjmOucIrH_SUvZG1RloYhTX34Pn4",
          language: "TH",
          region: "TH"
        }}
        defaultCenter={{ lat: 13.841033 , lng: 100.575260 }}
        defaultZoom={15}
        distanceToMouse={distanceToMouse}
      >
      </GoogleMapReact>
    </div>
  );
}

/*
{product.map(({ id,lat, long, buoyid}) => {
  return (
    <MyMarker key={id} lat={lat} lng={long} text={buoyid} />
  );
})}*/