// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const SignForm = () => {
  const [login, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmai] = useState('');



  const handleSign = async (e) => {
    // e.preventDefault();
    // handleClose();
    const status = 'online'
    try {
      const response = await axios.post('http://localhost:8001/auth/sign-up', { login, phone, password, email, status });
      // Handle successful login
      console.log(response.data);
      // store.addToken(response.data.token)
      // sessionStorage.setItem("token", response.data.token)
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
      ahsfliahfsliha
      
    "login": "tst12",
    "phone" : "12345678901",
    "password" : "qwerty",
    "email" : "kapkan@mail",
    "status" : "online"
        <form onSubmit={handleSign}>
      <input
        className="inputBox"
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        className="inputBox"
        type="text"
        placeholder="email"
        value={email}
        onChange={(e) => setEmai(e.target.value)}
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
    </>
  );
};

export default SignForm;
