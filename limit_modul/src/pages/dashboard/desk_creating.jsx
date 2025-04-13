// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../App.css';
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400, // задаёт фиксированную высоту
  overflowY: 'auto', // включает вертикальную прокрутку, если содержимое превышает высоту
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

const CreatingDesk = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const handleLogin = async (e) => {
    // e.preventDefault();
    handleClose();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.post('http://localhost:8002/api/dashboard/lists/', 
      {
        title, description
      });
      // Handle successful login
      location.reload()
      // store.addToken(response.data.token)
      // sessionStorage.setItem("token", response.data.token)
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  return (
<>
      <Button variant="contained" onClick={handleShow} style={{paddingBottom:'10px'}}>Create the desk</Button>
      <br></br>

      {/* <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}
      > */}
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header> <form onSubmit={handleLogin}>
            <input className="inputBox" type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
            <input className="inputBox" type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button variant="secondary" className='button' type="submit">Login</Button>
        </form></Modal> */}


        <Modal
        open={show}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
              Название
          </Typography>
          <Typography id="modal-modal-tittle-input" sx={{ mt: 2 }}>
            <TextField required id="outlined-required" value={title} onChange={(e) => setTitle(e.target.value)} label="Название"/>
          </Typography>
          <Typography id={`modal-modal-description-input`} sx={{ mt: 2 }} >
            <TextField required id={`outlined-required`} value={description} onChange={(e) => setDescription(e.target.value)} label={`Описание`}/>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={handleLogin}>Создать доску</Button>
          </Typography>
        </Box>
      </Modal>

    </>
  );
};

export default CreatingDesk;
