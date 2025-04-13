// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { redirect } from 'react-router-dom';

const LoginForm = () => {
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);



  const handleLogin = async (e) => {
    // e.preventDefault();
    // handleClose();

    try {
      const response = await axios.post('http://localhost:8001/auth/sign-in', { login, password });
      // Handle successful login
      console.log(response.data);
      // store.addToken(response.data.token)
      sessionStorage.setItem("token", response.data.token)
      window.location.href = 'http://localhost:5173/desks'
    // redirect("http://localhost:8001/")
      
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
<>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      {/* <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> */}
        <form onSubmit={handleLogin}>
      <input
        className="inputBox"
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="inputBox"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="secondary" className='button' type="submit">Login</Button>
    </form>
      {/* </Modal> */}
    </>
  );
};

export default LoginForm;
