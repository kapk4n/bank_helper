import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Offcanvas from 'react-bootstrap/Offcanvas';
import React, {useEffect} from 'react';
import axios from 'axios';
import Select from 'react-select'
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { FcInfo } from "react-icons/fc";

function OffCanvasExample({task, ...props}) {
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority2, setPriority] = useState('');
  const [status2, setStatus] = useState('');
  const [employee_id2, setEmployeeId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const options = [
    { value: 'Medium', label: 'Medium' },
    { value: 'High', label: 'High' },
    { value: 'Very high', label: 'Very high' },
    { value: 'Low', label: 'Low' }
  ]

  const options_status = [
    { value: 'To Do', label: 'To Do' },
    { value: 'In Work', label: 'In Work' },
    { value: 'Done', label: 'Done' }
  ]


  const handleUpdate = async (e) => {
    e.preventDefault();
    handleCloseUpdate();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const priority = priority2['value']
      const status = status2['value']
      const login = employee_id2
      const response = await axios.post(`http://localhost:8002/api/dashboard/tasks/${task['task_id']}`, 
      {
        title, description, login, priority, status
      });
      // console.log(response.data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  

  const [feedbacks2, setFeedbacks2] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks2([]);
      // const url = 'https://url.abc.com/';
      const api_response = axios.get(`http://localhost:8002/api/dashboard/room/${title['desk_id']}`, {
      });
      let data = await api_response;
        setFeedbacks2(data);
    }
    fetchArticles()
          // setInterval(fetchArticles(), 2000)
    }, [])
    const data2 = {feedbacks2};
    // console.log(data2)



  return (
    <>
      <Button variant="success" onClick={handleShow} className="me-2">
        Show details  <FcInfo />
      </Button>
      {/* {console.log(task)} */}
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{task['title']}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div>status: {task['status']}</div>
          <div>description: {task['description']}</div>
        <br></br>
          <Accordion alwaysOpen>
            <Accordion.Item eventKey="0">
            <Accordion.Header>Employee Information</Accordion.Header>
            <Accordion.Body>
              <div> Login: {task['employee_login']} </div>
              <div> Email: {task['employee_email']} </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Author Information</Accordion.Header>
            <Accordion.Body>
              <div> Login: {task['author_login']} </div>
              <div> Email: {task['author_email']} </div>
            </Accordion.Body>
          </Accordion.Item>
          </Accordion>

        <br></br>
          <Button variant="primary" onClick={handleShowUpdate} className="me-2">
          update
        </Button>
          <></>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <form onSubmit={handleUpdate}>

      <Form.Control type="text" placeholder="Title" defaultValue={task['title']} onChange={(e) => setTitle(e.target.value)} />

      <Select options={options}
      onChange={setPriority}
      />

      <Select options={options_status}
      onChange={setStatus}
      />

      <Form.Control type="text" placeholder="Employee" defaultValue={task['employee_login']} onChange={(e) => setEmployeeId(e.target.value)}/>

      <Form.Control type="text" placeholder="Description" defaultValue={task['description']} onChange={(e) => setDescription(e.target.value)} />

      <Button variant="secondary" className='button' type="submit">Update Task</Button>
    </form>
      </Modal>

    </>
  );
}

export default OffCanvasExample