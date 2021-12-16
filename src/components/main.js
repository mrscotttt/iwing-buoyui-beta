import {Table,Badge,Navbar,Nav,Form,Button,FormControl,Card,Container,Row,Col,DropdownButton,Dropdown,Select,Option,Jumbotron} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Headbar from './headbar';
import Bottom from './bottom';
import * as Icon from 'react-bootstrap-icons';
import GoogleMapReact from "google-map-react";
import MyMarker from "./MyMarker";
import "./style.css";

const Main = () => {

  const [product, setProduct] = useState([])
  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(product => setProduct(product))
      console.log(product)
  },[])

  const distanceToMouse = (pt, mp) => {
    if (pt && mp) {
      return Math.sqrt(
        (pt.x - mp.x) * (pt.x - mp.x) + (pt.y - mp.y) * (pt.y - mp.y)
      );
    }
  };
  
  const points = [
    { id: 1, title: "Round Pond", lat: 13.8470457, lng: 100.563707},
    { id: 2, title: "The Long Water", lat: 13.8470457, lng: 100.563707 },
    { id: 3, title: "The Serpentine", lat: 13.8470457, lng: 100.563707}
  ];

  return(
    <div className="App-main">
    <Headbar></Headbar>  
    <br></br>
          <Row>
          <Col xs="1"></Col>
          <Col>
            <GoogleMapReact
                bootstrapURLKeys={{
                  // remove the key if you want to fork
                  key: "AIzaSyCb4S_KjmOucIrH_SUvZG1RloYhTX34Pn4",
                  language: "TH",
                  region: "TH"
                }}
                defaultCenter={{ lat: 13.841033 , lng: 100.575260 }}
                defaultZoom={17}
                distanceToMouse={distanceToMouse}
              >
                {product.map(({ id,lat, long, buoyid}) => {
                  return (
                    <MyMarker key={id} lat={lat} lng={long} text={buoyid} tooltip={buoyid} />
                  );
                })}
            </GoogleMapReact>
            <br/>
            <Card border="dark">
            <Card.Header as="h5">
              <Row>
              <Col xs="3">
              <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                เลือกทุ่น
              </Dropdown.Toggle>
              <Dropdown.Menu >
              {product.map( el=> (<Dropdown.Item key={el.id}>{el.buoyid}</Dropdown.Item>))}
              </Dropdown.Menu>
              </Dropdown>
              </Col>  
              <Col><Badge variant="success"><Icon.BatteryHalf/>{"  "}{"Current Battery 97%"}</Badge></Col>
              </Row>
            </Card.Header>
            </Card>
            <br/>
            <Card border="dark">
            <Card.Header as="h5">
            <Table striped bordered hover variant="dark" size="sm">
                  <thead>
                    <tr>
                      <th><h6>Date</h6></th>
                      <th>time</th>
                      <th>temp</th>
                      <th>ec</th>
                      <th>ac</th>
                      <th>gyro</th>
                      <th>lat/long</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.map( el=> (
                        <tr key={el.id}>
                          <td>{el.dd}/{el.mm}/{el.yy}</td>
                          <td>{el.hh}:{el.mn}:{el.ss}</td>
                          <td>{el.temp}</td>
                          <td>{el.ec}</td>
                          <td>{el.ax}:{el.ay}:{el.az}</td>
                          <td>{el.gx}:{el.gy}:{el.gz}</td>
                          <td>{el.lat},{el.long}</td>
                        </tr>  
                    ))}
                  </tbody>
                </Table>
              {product.map( el=> (
                  <span key={el.id}>
                    
                  </span>
              ))}
            </Card.Header>

            </Card>
          </Col>
          <Col xs="1"></Col>
      
          </Row> 
          
          <Bottom></Bottom>
    </div>
  );
}

export default Main;
