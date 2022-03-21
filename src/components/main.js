import {InputGroup,Table,Badge,Navbar,Nav,Form,Button,FormControl,Card,Container,Row,Col,DropdownButton,Dropdown,Select,Option,Jumbotron} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Headbar from './headbar';
import Bottom from './bottom';
import * as Icon from 'react-bootstrap-icons';
import "./style.css";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,AreaChart, Area,Label} from "recharts";

const Main = () => {
  const [product, setProduct] = useState([])
  const [list, setList] = useState([])
  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(product => setProduct(product))
      //console.log(product)
  },[])

  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(list => setList(list))
      //console.log(product)
  },[])

  for (let i = 0; i < product.length; i++) {
    const d = product[i].hh+":"+product[i].mn+":"+product[i].ss
    product[i].time = d
  } 

  const Buoylist = [...new Map(product.map(item =>[item.buoyid, item])).values()];
  const dlist = [...new Map(product.map(item =>[item.dd, item])).values()];
  const mlist = [...new Map(product.map(item =>[item.mm, item])).values()];
  const ylist = [...new Map(product.map(item =>[item.yy, item])).values()];

  const [b, setb] = useState("choose");
  const [cd, setcd] = useState("day");
  const [cm, setcm] = useState("month");
  const [cy, setcy] = useState("year");

  const Mypath = [];
  let cnt = 0;
  for (let i = 0; i < product.length; i++) {
      if(product[i].buoyid==b&&
         product[i].dd==cd&&
         product[i].mm==cm&&
         product[i].yy==cy
        ){
        Mypath[cnt]={ bouyid: product[i].buoyid,
                      ctime: (product[i].hh*60)+product[i].mn,
                      time: (product[i].hh).toString()+":"+(product[i].mn).toString(),
                      ec: (product[i].ec),
                      gx: (product[i].gx),
                      gy: (product[i].gy),
                      gz: (product[i].gz),
                      ax: (product[i].ax),
                      ay: (product[i].ay),
                      az: (product[i].az),
                      temp: (product[i].temp),
                      battery: (product[i].battery)
                    };
        cnt = cnt + 1
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
                  value={b}
                  onChange={(e) => setb(e.target.value)}
                  //onChange={handle_id}
                  as="select"
                  >
                    <option>{b}</option>
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
                  value={cd}
                  onChange={(e) => setcd(e.target.value)}
                  as="select"
                  >
                    <option>{cd}</option>
                    {dlist.map( el=> (<option key={el.id}>{el.dd}</option>))}
                </Form.Control>
                <Form.Control 
                  type="string" 
                  required 
                  value={cm}
                  onChange={(e) => setcm(e.target.value)}
                  as="select"
                  >
                    <option>{cm}</option>
                    {mlist.map( el=> (<option key={el.id}>{el.mm}</option>))}
                </Form.Control>
                
                <Form.Control 
                  type="string" 
                  required 
                  value={cy}
                  onChange={(e) => setcy(e.target.value)}
                  as="select"
                  >
                    <option>{cy}</option>
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
            <Card.Header as="h5">
            <Table striped bordered hover /*variant="dark"*/ size="sm">
                  <thead>
                    <tr>
                      <th><center>BuoyID</center></th>
                      <th><center>Date</center></th>
                      <th><center>Time</center></th>
                      <th><center>Temperature(°C)</center></th>
                      <th><center>Turbidity</center></th>
                      <th><center>Accelerometer(x:y:z)</center></th>
                      <th><center>Gyroscope(x:y:z)</center></th>
                      <th><center>Location</center></th>
                    </tr>
                  </thead>
                  <tbody>
                    {product
                      .filter(task => task.buoyid == b && task.dd == cd && task.mm == cm && task.yy == cy  )
                      .map( el=> (
                        <tr key={el._id}>
                          <td><h6><center>{el.buoyid}</center></h6></td>
                          <td><h6><center>{el.dd}/{el.mm}/{el.yy}</center></h6></td>
                          <td><h6><center>{el.hh}:{el.mn}:{el.ss}</center></h6></td>
                          <td><h6><center>{el.temp}</center></h6></td>
                          <td><h6><center>{el.ec}</center></h6></td>
                          <td><h6><center>{el.ax}:{el.ay}:{el.az}</center></h6></td>
                          <td><h6><center>{el.gx}:{el.gy}:{el.gz}</center></h6></td>
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
            <br></br>
            
            <Row>
            <Col xs="4">
            <Card>
            <LineChart width={500} height={300} data={Mypath} margin={{top: 5,right: 30,left: 20,bottom: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time">
                <Label value="Temperature(*C)" offset={30} position="bottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ec" stroke="#e6872e" />
            </LineChart>
            </Card>
            </Col>
            <Col xs="4">
            <Card>
            <LineChart width={500} height={300} data={Mypath} margin={{top: 5,right: 30,left: 20,bottom: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time">
                <Label value="Turbidity(Analog)" offset={30} position="bottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
            </LineChart>
            </Card>
            </Col>
            <Col xs="4">
            <Card>
            <LineChart width={500} height={300} data={Mypath} margin={{top: 5,right: 30,left: 20,bottom: 30}}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time">
                <Label value="Gyroscope/Accelerometer" offset={30} position="bottom" />
                </XAxis>
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ax" stroke="#38389b" />
                <Line type="monotone" dataKey="ay" stroke="#7a5ce6" />
                <Line type="monotone" dataKey="az" stroke="#5be7f6" />
                <Line type="monotone" dataKey="gx" stroke="#e3ce3c" />
                <Line type="monotone" dataKey="gy" stroke="#e39f3c" />
                <Line type="monotone" dataKey="gz" stroke="#e34c3c" />
            </LineChart>
            </Card>
            </Col>
            </Row>
            <br></br>
            <Col>
            {/*
              <Row>
              <Col xs="6">
              <Card>
              <VictoryChart
                theme={VictoryTheme.material}
                height={200}
                maxDomain={{ y: 1000 }}
                minDomain={{ y: 0 }}
                style={{
                  labels: {fontSize: 7}
                }}
              >
                <VictoryLine 
                  interpolation="natural"
                  style={{
                    data: { stroke: "#6f6ff0" },
                    parent: { border: "1px solid #ccc"},
                    labels: {fontSize: 7}
                  }}
                  data={product.filter(task => task.buoyid == b && task.dd == cd && task.mm == cm && task.yy == cy)}
                  x="time"
                  y="ec"
                  label="ec"
                />
              </VictoryChart>
              </Card>
              </Col>
              <Col xs="6">
              <Card>
              <VictoryChart
                theme={VictoryTheme.material}
                height={200}
                maxDomain={{ y: 50 }}
                minDomain={{ y: 0 }}
              >
                <VictoryLine
                  interpolation="natural"
                  style={{
                    data: { stroke: "#6f6ff0" },
                    parent: { border: "1px solid #ccc"}
                  }}
                  data={product.filter(task => task.buoyid == b && task.dd == cd && task.mm == cm && task.yy == cy)}
                  x="time"
                  y="temp"
                />
              </VictoryChart>
              </Card>
              </Col>
              </Row>*/}
            </Col>
          </Col>
          <Col xs="1"></Col>
          </Row> 
          <Bottom></Bottom>
    </div>
  );
}

export default Main;
