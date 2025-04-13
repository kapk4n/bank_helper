// LoginForm.js
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../App.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useParams} from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Select from 'react-select'

const CreatingTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority2, setPriority] = useState('');
  // const [desk_id, setDeskId] = useState('');
  const [employee_id2, setEmployeeId] = useState('');

  const [show, setShow] = useState(false);
  const [feedbacks_users, setFeedbacks_room] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const options2 = []

  // const login = employee_id_2
  const { id } = useParams();


  const options = [
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Very high', label: 'Very high' },
    { value: 'Low', label: 'Low' }
  ]

  const deleteDesk = async (e) => {
  
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.delete(`http://localhost:8002/api/dashboard/room/delete/${id}`);
      location.reload()
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  useEffect(() => {

    const fetchArticles = async () => {
      setFeedbacks_room([]);
      console.log(id)
      const api_response = axios.get(`http://localhost:8002/api/dashboard/room/logins/${id}`, {
        headers: {
          "access-control-allow-origin":"http://localhost:8002/",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
        },
      });

      let data_users = await api_response;
      setFeedbacks_room(data_users);

    }
    fetchArticles()

    }, [])

    const data_users = {feedbacks_users};

  const handleLogin = async (e) => {
    // const queryString = window.location.href;
    const desk_id = parseInt(id)
    // taskStore.showTasks(desk_id)
    // console.log(id)
    e.preventDefault();
    handleClose();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const priority = priority2['value']
      const login = employee_id2['value']
      const response = await axios.post('http://localhost:8002/api/dashboard/tasks/', 
      {
        title, description, desk_id, login, priority
      });
      // Handle successful login
      console.log(response.data);
      location.reload()
      // store.addToken(response.data.token)
      // localStorage.setItem("token", response.data.token)
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };

  function opt (data) {
    Array(data.length).fill(true).map((_, i) => options2.push({value:data[i]['login'], label: data[i]['login']}))
    
    return true
  }

  function ar(data){
    if (data != undefined & data != null){
      if (data.data != undefined) {
        return true
      }
    }
  }
  
  return (
<>
      <Button variant="primary" onClick={handleShow}>
        Create the Task
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleLogin}>
      {/* <input
        className="inputBox"
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      /> */}
      <Form.Control type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />

            {/* <input
        className="inputBox"
        type="text"
        placeholder="priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      /> */}
                  <Select options={options} 
      onChange={setPriority}
      />

            {/* <input
        className="inputBox"
        type="text"
        placeholder="employee_id_2"
        value={employee_id2}
        onChange={(e) => setEmployeeId(e.target.value)}
      /> */}
      {/* <Form.Control type="text" placeholder="Employee" onChange={(e) => setEmployeeId(e.target.value)} /> */}

      {ar(data_users.feedbacks_users.data) ? opt(data_users.feedbacks_users.data['data']) ? <Select options={options2} onChange={setEmployeeId}/> : '' :''} 

      {/* {ar(data_users.feedbacks_users.data) ? console.log(data_users.feedbacks_users.data['data']) : ''} */}
      {/* {console.log(data_users)} */}
      
      {/* <input
        className="inputBox"
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      /> */}
      <Form.Control type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <Button variant="secondary" className='button' type="submit">Create Task</Button>
    </form>
      </Modal>
    </>
  );
};

export default CreatingTask;
