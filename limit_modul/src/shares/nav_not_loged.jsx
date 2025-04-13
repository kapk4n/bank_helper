import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from '@mui/material/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiAlignJustify } from "react-icons/fi";
import Image from 'react-bootstrap/Image';
import Box from '@mui/material/Box';
import SvgIcon from '@mui/material/SvgIcon';
import React, { Component, useEffect} from "react";
import { useState } from "react";
import Modal from '@mui/material/Modal';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

function NotLogedNav() {
  // const logout = async (e) => {
  //   e.preventDefault();
  //   sessionStorage.clear()
  //   window.location.reload()
  // };
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async (e) => {
    e.preventDefault();
    handleClose();

    try {
      const response = await axios.post('http://localhost:8001/auth/sign-in', { login, password });
      // Handle successful login
      console.log(response.data);
      // store.addToken(response.data.token)
      sessionStorage.setItem("token", response.data.token)
      // redirect("http://localhost:8001/")
      window.location.href = ''
      
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };


  const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h2" style={{fontSize: 14, color:'gray'}}>
            Подтверждение бронирования 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 18 }}>
            Авторизация
          </Typography>
          <Typography id="modal-modal-description" component="h2" sx={{ mt: 1,  }}>
            <div style={{ display: 'flex', justifyContent:'start', flexDirection:'row', width:'300px', paddingBottom:'15px'}}>
                <div style={{ display: 'flex', flexDirection:'column', justifyContent:'flex-start', width:'100px', color:'gray', fontSize:14}}>
                  <div style={{paddingTop:'2px', width:'200px'}}>
                  <InputLabel htmlFor="outlined-adornment-amount">Логин</InputLabel>
                    <OutlinedInput
                      value={login}
                      onChange={(e) => setUsername(e.target.value)}
                      id="outlined-adornment-amount"
                      label="Amount"
                    />
                  </div>
                  <div style={{paddingTop:'3px', width:'200px'}}>
                  <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-password"
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label={
                                  showPassword ? 'hide the password' : 'display the password'
                                }
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                onMouseUp={handleMouseUpPassword}
                                edge="end"
                              >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                  </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Button variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'gray', color:'white'}} onClick={handleClose}>Отмена</Button>
            <Button    sx={{textTransform: "none",}} variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'#f56e29', color:'white'}} onClick={handleLogin}>Войти</Button>
            </div>
          </Typography>
        </Box>
      </Modal>
    <Navbar collapseOnSelect expand="lg" className="back_ground_table">
      <Container>
        <Navbar.Brand>
                      <Button variant="" onClick={handleShow}>
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
                        <div style={{padding:'40% 0%'}}>
                          <div style={{paddingBottom:'10px'}}>
                            <Button variant="contained" style={{fontSize:'16px', width: '100%', height:'60px', backgroundColor:'#f56e29', color:'white'}}>Скачать решение</Button>
                          </div>
                          <div>
                            <Button variant="contained" style={{fontSize:'16px', width: '100%', height:'60px', backgroundColor:'#f56e29', color:'white'}}>Скачать данные об утилизации</Button>
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
            <Button onClick={handleOpen}>Войти</Button>
            {/* <Button href='/'>Зарегистрироваться</Button> */}
            {/* <Button onClick={logout}>Logout</Button> */}
            {/* <Button>Logout</Button> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default NotLogedNav;