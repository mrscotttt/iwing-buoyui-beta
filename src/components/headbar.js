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

  const Logout=()=> {
    localStorage.clear();
    window.location.href = '/login';
}
  
  return (
    <div className="App-main">
      <Navbar bg="dark" variant="dark">
      <Container>
      <Navbar.Brand href="#home">DataBuoy</Navbar.Brand>
      <Nav className="mr-auto" variant="pills">
      
      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        เลือกวันที่
      </Dropdown.Toggle>
      <Dropdown.Menu >
      {product.map( el=> (<Dropdown.Item key={el.id}>{el.dd}/{el.mm}/{el.yy}</Dropdown.Item>))}
      </Dropdown.Menu>
    
      </Dropdown>
    
      </Nav>
      <Form inline>
      <Navbar.Brand></Navbar.Brand>
      <Button variant="light" 
              href="/login" 
              size="sm"
      >
      <Icon.BoxArrowRight/></Button>
      </Form>
      </Container>
      </Navbar>
    </div>
  );
}

export default Headbar;
