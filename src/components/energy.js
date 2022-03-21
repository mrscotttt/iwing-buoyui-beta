import {InputGroup,Table,Badge,Navbar,Nav,Form,Button,FormControl,Card,Container,Row,Col,DropdownButton,Dropdown,Select,Option,Jumbotron} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Headbar from './headbar';
import Bottom from './bottom';
import * as Icon from 'react-bootstrap-icons';
import GoogleMapReact from "google-map-react";
//import MyMarker from "./MyMarker";
import "./style.css";

const Energy = () => {
  const [product, setProduct] = useState([])
  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(product => setProduct(product))
      console.log(product)
  },[])

  const Buoylist = [...new Map(product.map(item =>[item.buoyid, item])).values()];

  const Bttrlevel = (v) =>{
    if(v>=4){
      return (
        <div>
          {"Hight"}
        </div>
      );
    }
    else if(v>=3){
      return (
        <div>
          {"Medium"}
        </div>
      );
    }
    else if(v>=2.5){
      return (
        <div>
          {"Low"}
        </div>
      );
    }
    else if(v<2.5){
      return (
        <div>
          {"Very Low"}
        </div>
      );
    }
  }

  return(
    <div className="App-main">
    <Headbar></Headbar>  
          <Row>
          <Col xs="1"></Col>
          <Col>
            <br/>
            <Card className="dark" >
            <Card.Header as="h5">
              <Row>
              <Col xs="10">
              <Button variant="danger" size="lg">Battery Status</Button>
              </Col>
              <Col xs="0.5">
              <Button variant="dark" href="/main" size="sm">
              <div class="wrapper" href="/map">
                <div class="icon instagram" href="/map">
                  <div class="tooltip" href="/map">Chart</div>
                  <span href="/map"><i class="fab fa-instagram" href="/map" ><Icon.BarChartLineFill href="/map"/></i></span>
                </div>
              </div>
              </Button>
              </Col>
              <Col xs="0.5">
              <Button variant="dark" href="/energy" size="sm">
              <div class="wrapper" href="/map">
                <div class="icon youtube" href="/map">
                  <div class="tooltip" href="/map">Energy</div>
                  <span href="/map"><i class="fab fa-youtube" href="/map" ><Icon.LightningChargeFill href="/map"/></i></span>
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
            <Card.Header as="h5">
            <Table striped bordered hover /*variant="dark"*/ size="sm">
                  <thead>
                    <tr>
                      <th><center>Status</center></th>
                      <th><center>BuoyID</center></th>
                      <th><center>Current Battery</center></th>
                      <th><center>Update Time</center></th>
                      <th><center>Last Location</center></th>
                    </tr>
                  </thead>
                  <tbody>
                    {Buoylist
                      .map( el=> (
                        <tr key={el._id}>
                          <td><h6><center>{Bttrlevel(el.battery)}</center></h6></td>
                          <td><h6><center>{el.buoyid}</center></h6></td>
                          <td><h6><center>{el.battery}</center></h6></td>
                          <td><h6><center>date {el.dd}/{el.mm}/{el.yy} time {el.hh}:{el.mn}:{el.ss}</center></h6></td>
                          <td><h6><center>{el.lat},{el.long}</center></h6></td>
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

export default Energy;
