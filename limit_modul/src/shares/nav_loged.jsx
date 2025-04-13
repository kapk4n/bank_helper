import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
// import Profile from '../pages/profile';
import Button from '@mui/material/Button';
// import LoginForm from './login_form';

import { BsFillGridFill } from "react-icons/bs";
import { useState } from "react";

import { observer } from 'mobx-react-lite';

import Offcanvas from 'react-bootstrap/Offcanvas';
import { BsJustify } from "react-icons/bs";
import { BsList } from "react-icons/bs";
import { FiAlignJustify } from "react-icons/fi";
import Image from 'react-bootstrap/Image';

import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function LogedNav() {
    const logout = async (e) => {
      e.preventDefault();
      sessionStorage.clear()
      window.location.reload()
    };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <Navbar collapseOnSelect expand="lg" className="back_ground_table">
      <Container>
        <Navbar.Brand>
                      <Button variant="" onClick={handleShow}>
                      {/* <BsFillGridFill /> */}
                      {/* <BsJustify /> */}
                      {/* <BsList /> */}
                      <FiAlignJustify />
                    </Button>
                    <Button variant="" href='/'>
                        <HomeIcon fontSize="large" />
                    </Button>


                    <Offcanvas show={show} onHide={handleClose}>
                      <Offcanvas.Header closeButton>
                        <Offcanvas.Title></Offcanvas.Title>
                      </Offcanvas.Header>
                      <Offcanvas.Body>
                        <div style={{padding:'10% 0%'}}>
                          <div style={{paddingBottom:'10px'}}>
                            <Button variant="contained" href="/limit_module" style={{fontSize:'16px', width: '100%', backgroundColor:'#f56e29', color:'white'}}>Лимитный модуль</Button>
                          </div>
                          <div style={{paddingBottom:'10px'}}>
                            <Button variant="contained" href="/employe_tests" style={{fontSize:'16px', width: '100%', backgroundColor:'#f56e29', color:'white'}}>Тесты</Button>
                          </div>
                          <div style={{paddingBottom:'10px'}}>
                            <Button variant="contained" href="/library" style={{fontSize:'16px', width: '100%', backgroundColor:'#f56e29', color:'white'}}>Библиотека знаний</Button>
                          </div>
                          <div style={{paddingBottom:'10px'}}>
                            <Button variant="contained" href='/employe/list' style={{fontSize:'16px', width: '100%', backgroundColor:'#f56e29', color:'white'}}>Список сотрудников</Button>
                          </div>
                          <div style={{paddingBottom:'10px'}}>
                            <Button variant="contained" href="/desks" style={{fontSize:'16px', width: '100%', backgroundColor:'#f56e29', color:'white'}}>Задачный менеджер</Button>
                          </div>
                        </div>
                      </Offcanvas.Body>
                    </Offcanvas>
          </Navbar.Brand>


        <Navbar.Brand href="https://ingobank.ru/">  <Image src="https://ingobank.ru/local/templates/ingos_2023/img/logo.svg" width="190" rounded /> </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/desks">Поиск</Nav.Link> */}
          </Nav>
          <Nav>
            <Button href='/profile'>Profile</Button>
            <Button onClick={logout}>Logout</Button>
            {/* <Button>Logout</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LogedNav;