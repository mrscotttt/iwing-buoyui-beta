import {Container,Dropdown,Navbar,Nav,Form,Button,FormControl,Card,NavDropdown } from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';
import './style.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


const Headbar = () => {
  const history = useHistory()

  const [product, setProduct] = useState([])
  useEffect(() => {
    fetch('/s')
      .then(res => res.json())
      .then(product => setProduct(product))
      console.log(product)
  },[])
  
  return (
    <div className="App-main">
      <Navbar className="dark" variant="dark" >
      <Container>
      <Navbar.Brand href="/main"><h3>DataBuoy</h3></Navbar.Brand>
      
      <Nav className="mr-auto" variant="pills">
    
      </Nav>
      
      <Form inline>
      <Navbar.Brand></Navbar.Brand>
              
      </Form>
      </Container>
      </Navbar>
    </div>
  );
}
export default Headbar;
