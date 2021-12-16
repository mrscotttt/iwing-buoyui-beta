import {Table,Badge,Navbar,Nav,Form,Button,FormControl,Card,Container,Row,Col,DropdownButton,Dropdown,Select,Option,Jumbotron} from 'react-bootstrap';
import React, { Component,useState, useEffect } from 'react';
import Headbar from './headbar';
import Bottom from './bottom';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Polygon
} from "react-google-maps";
import * as Icon from 'react-bootstrap-icons';

const containerStyle = {
  // position: 'relative',  
  display: 'flex',
  width: '100%',
  height: '550px'
}


class Map extends React.Component {
  path = [
    {},
    {}
  ];
  render = () => {
    return (
      <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: 12.848126, lng: 100.8569836}}
      >
        <Polygon path={this.path} options={{ strokeColor: "#FF0000 " }} />
      </GoogleMap>
    );
  };
}
const MapComponent = withScriptjs(withGoogleMap(Map));

const Mainpage = () => {

  const [data, setdata] = useState([])
  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(data => setdata(data))
      console.log(data)
  },[])

  return(
    <div className="App-main">
    <Headbar></Headbar>  
    <br></br>
    
          
          <Row>
          <Col xs="1"></Col>
          <Col xs="4">
  
            <Card border="dark">
            <Card.Header as="h5">
              <Button type="submit" variant="primary" size="sm" ><Icon.ArrowDownRightCircle/>{' รายละเอียด'}</Button>
              {" ข้อมูลประจำวันที่ 1 ธันวาคม 2022"}
            </Card.Header>
            <Card.Body>
              <p><Badge variant="warning">{"อุณหภูมิโดยรวม : "}</Badge>{" "}<Badge variant='warning'>{" 37.6 องศาเซลเซียส"}</Badge></p>
              <p><Badge variant="warning">{"สถาพความขุ่นของน้ำ : "}</Badge>{" "}<Badge variant='warning'>{" 37.6 NTU (น้ำใสสะอาด)"}</Badge></p>
              <p><Badge variant="warning">{"ลักษณะของกระแสน้ำ : "}</Badge>{" "}<Badge variant='warning'>{" นิ่งสงบ"}</Badge></p>
            </Card.Body>
            </Card>
            <br/>
            <Card border="dark">
            <Card.Header as="h5">
              <Row>
              <Col xs="3">
              <Dropdown>
              <Dropdown.Toggle variant="danger" id="dropdown-basic">
                เลือกทุ่น
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item >Buoy01</Dropdown.Item>
                <Dropdown.Item >Buoy02</Dropdown.Item>
                <Dropdown.Item >Buoy03</Dropdown.Item>
                <Dropdown.Item >Buoy04</Dropdown.Item>
              </Dropdown.Menu>
              </Dropdown>
              </Col>  
              <Col><Badge variant="success"><Icon.BatteryHalf/>{"  "}{"Current Battery 97%"}</Badge></Col>
              </Row>
            </Card.Header>

            </Card>
            <br/>
            <Card border="success" >
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>Temp (*C)</th>
                    <th>EC (NTU)</th>
                    <th>Lat</th>
                    <th>Lng</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>10:00am</td>
                    <td>25</td>
                    <td>615</td>
                    <td>12.8852555</td>
                    <td>100.2452663</td>
                  </tr>
                  <tr>
                    <td>10:10am</td>
                    <td>25</td>
                    <td>615</td>
                    <td>12.8852555</td>
                    <td>100.2452663</td>
                  </tr>
                  <tr>
                    <td>10:20am</td>
                    <td>25</td>
                    <td>615</td>
                    <td>12.8852555</td>
                    <td>100.2452663</td>
                  </tr>
                  <tr>
                    <td>10:30am</td>
                    <td>25</td>
                    <td>615</td>
                    <td>12.8852555</td>
                    <td>100.2452663</td>
                  </tr>
                </tbody>
              </Table>
            
            </Card>

          </Col>
          
          <Col xs="6">
            <Card border="dark">
            <MapComponent
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `600px`, width: "800px" }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            </Card>
          </Col>
          <Col xs="1">
        
          </Col>
          </Row> 
           
        
          <Bottom></Bottom>
    </div>
  );
}
export default Mainpage;
