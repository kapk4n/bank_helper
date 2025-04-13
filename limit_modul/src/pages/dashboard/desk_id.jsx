import '../../App.css'
import CardTask from '../../shares/cards_task.jsx'
import React, {useState, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CreatingTask from './task_creating'
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Select from 'react-select'

const DesksId = observer(() => {

  // const queryString = window.location.href;
  // const desk_id = queryString.slice(-1)
  const [key, setKey] = useState('home');
  let { id } = useParams();
  // taskStore.showTasks(desk_id)
  // console.log(id)
  const [showUpdate, setShowUpdate] = useState(false);
  const [showNewUser, setShowNewUser] = useState(false);
  const [showdeleteUser, setShowdeleteUser] = useState(false);

  // const [login, setPriority] = useState('');

  const [login2, setLogin] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [feedbacks_2, setFeedbacks_2] = useState([]);
  const [feedbacks_to_do, setFeedbacks_to_do] = useState([]);
  const [feedbacks_in_work, setFeedbacks_in_work] = useState([]);
  const [feedbacks_done, setFeedbacks_done] = useState([]);
  const [feedbacks_room, setFeedbacks_room] = useState([]);
  const [feedbacks_users, setFeedbacksUsers] = useState([]);
  

  const handleCloseUpdate = () => setShowUpdate(false);
  const handleShowUpdate = () => setShowUpdate(true);

  const handleCloseNewUser = () => setShowNewUser(false);
  const handleShowNewUser = () => setShowNewUser(true, handleCloseUpdate());

  const handleClosedeleteUser = () => setShowdeleteUser(false);
  const handleShowdeleteUser = () => setShowdeleteUser(true, handleCloseUpdate());

  const options = []
  const options2 = []



  const deleteUser = async (e) => {
    e.preventDefault();
    handleClosedeleteUser();
    var loginw = login2.value
    // console.log(login)
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
 
      const response = await axios.delete(`http://localhost:8002/api/dashboard/room/delete/${id}`, 
{      data: {
        login: loginw
      }});
      // console.log(response.data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };



  const addUser = async (e) => {
    e.preventDefault();
    handleCloseUpdate();
    var login = login2.value
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
 
      const response = await axios.post(`http://localhost:8002/api/dashboard/room/newuser/${id}`, 
      {
        login
      });
      // console.log(response.data);
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };



  useEffect(() => {

    const ShowUsers = async () => {
      setFeedbacksUsers([]);

      const api_response = axios.get(`http://localhost:8002/api/dashboard/room/all`, {
        headers: {
          "access-control-allow-origin":"http://localhost:8002/",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      let data_users = await api_response;
        setFeedbacksUsers(data_users);
    }
    ShowUsers()

    }, [])


  const data_users = {feedbacks_users}; 


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

      let data_room = await api_response;
      setFeedbacks_room(data_room);
    }
    fetchArticles()

    }, [])

    const data_room = {feedbacks_room};



  useEffect(() => {

    const fetchArticles = async () => {
      setFeedbacks([]);

      const api_response = axios.get(`http://localhost:8002/api/dashboard/tasks/all/${id}`, {
        headers: {
          "access-control-allow-origin":"http://localhost:8002/",
          "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()

    }, [])

    const data = {feedbacks};

    useEffect(() => {

      const ShowMyTasks = async () => {
        setFeedbacks_2([]);

        const api_response = axios.get(`http://localhost:8002/api/dashboard/tasks/byid/${id}`, {
          headers: {
            "access-control-allow-origin":"http://localhost:8002/",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        let data_2 = await api_response;
          setFeedbacks_2(data_2);
      }
      ShowMyTasks()

      }, [])


    const data_own_tasks = {feedbacks_2}; 







    useEffect(() => {

      const ShowMyTasks = async () => {
        setFeedbacks_to_do([]);

        const api_response = axios.get(`http://localhost:8002/api/dashboard/tasks/all/${id}/todo`, {
          headers: {
            "access-control-allow-origin":"http://localhost:8002/",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        let data_to_do = await api_response;
          setFeedbacks_to_do(data_to_do);
      }
      ShowMyTasks()

      }, [])


    const data_to_do = {feedbacks_to_do}; 






    useEffect(() => {

      const ShowMyTasks = async () => {
        setFeedbacks_in_work([]);

        const api_response = axios.get(`http://localhost:8002/api/dashboard/tasks/all/${id}/inwork`, {
          headers: {
            "access-control-allow-origin":"http://localhost:8002/",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        let data_in_work = await api_response;
          setFeedbacks_in_work(data_in_work);
      }
      ShowMyTasks()

      }, [])


    const data_in_work = {feedbacks_in_work}; 


    useEffect(() => {

      const ShowMyTasks = async () => {
        setFeedbacks_done([]);

        const api_response = axios.get(`http://localhost:8002/api/dashboard/tasks/all/${id}/done`, {
          headers: {
            "access-control-allow-origin":"http://localhost:8002/",
            "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        let data_done = await api_response;
          setFeedbacks_done(data_done);
      }
      ShowMyTasks()
      }, [])


    const data_done = {feedbacks_done}; 

    function opt (data) {
      Array(data.length).fill(true).map((_, i) => options.push({value:data[i], label: data[i]}))
      
      return true
    }

    function opt2 (data) {
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
    
    <div>
      <CreatingTask />
      <Button variant="primary" onClick={handleShowUpdate} className="me-2">
          Users
        </Button>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
        
      >
        <Tab eventKey="home" title={`All tasks (${ar(data.feedbacks.data) ? data.feedbacks.data['data'].length : '0'})`} >
          <ProgressBar variant="danger" now={ar(data_to_do.feedbacks_to_do.data) ? ar(data_done.feedbacks_done.data) ?(data_done.feedbacks_done.data['data'].length)/(data.feedbacks.data['data'].length)*100 : '' : ''} />
          {ar(data.feedbacks.data) ? Array(data.feedbacks.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data.feedbacks.data['data'][i]}/>) : ''} 
        </Tab>


        <Tab eventKey="profile" title={`My Tasks (${ar(data_own_tasks.feedbacks_2.data) ? data_own_tasks.feedbacks_2.data['data'].length : '0'})`}>
          <ProgressBar variant="danger" now={ar(data_to_do.feedbacks_to_do.data) ? ar(data_done.feedbacks_done.data) ?(data_done.feedbacks_done.data['data'].length)/(data.feedbacks.data['data'].length)*100 : '' : ''} />

          {ar(data_own_tasks.feedbacks_2.data) ? Array(data_own_tasks.feedbacks_2.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data_own_tasks.feedbacks_2.data['data'][i]}/>) : ''} 
        </Tab>

        
        <Tab eventKey="to_do" title={`To Do (${ar(data_to_do.feedbacks_to_do.data) ? data_to_do.feedbacks_to_do.data['data'].length : '0'})`}>
          <ProgressBar variant="danger" now={ar(data_to_do.feedbacks_to_do.data) ? ar(data_done.feedbacks_done.data) ?(data_done.feedbacks_done.data['data'].length)/(data.feedbacks.data['data'].length)*100 : '' : ''} />

          {ar(data_to_do.feedbacks_to_do.data) ? Array(data_to_do.feedbacks_to_do.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data_to_do.feedbacks_to_do.data['data'][i]}/>) : ''} 
          </Tab>


          <Tab eventKey="in_work" title={`In work (${ar(data_in_work.feedbacks_in_work.data) ? data_in_work.feedbacks_in_work.data['data'].length : '0'})`}>
          <ProgressBar variant="danger" now={ar(data_to_do.feedbacks_to_do.data) ? ar(data_done.feedbacks_done.data) ?(data_done.feedbacks_done.data['data'].length)/(data.feedbacks.data['data'].length)*100 : '' : ''} />

          {ar(data_in_work.feedbacks_in_work.data) ? Array(data_in_work.feedbacks_in_work.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data_in_work.feedbacks_in_work.data['data'][i]}/>) : ''} 
          </Tab>


          <Tab eventKey="done" title={`Done (${ar(data_done.feedbacks_done.data) ? data_done.feedbacks_done.data['data'].length : '0'})`}>
          <ProgressBar variant="danger" now={ar(data_to_do.feedbacks_to_do.data) ? ar(data_done.feedbacks_done.data) ?(data_done.feedbacks_done.data['data'].length)/(data.feedbacks.data['data'].length)*100 : '' : ''} />

            {ar(data_done.feedbacks_done.data) ? Array(data_done.feedbacks_done.data['data'].length).fill(true).map((_, i) => <CardTask key={i} {...data_done.feedbacks_done.data['data'][i]}/>) : ''} 
            </Tab>

      </Tabs>
          {/* {console.log(ar(data_to_do.feedbacks_to_do.data) ? ar(data_done.feedbacks_done.data) ?(data.feedbacks.data['data'].length): '': '')} */}


      <Modal
        show={showUpdate}
        onHide={handleCloseUpdate}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Users</Modal.Title>
        </Modal.Header>
        {ar(data_room.feedbacks_room.data) ? Array(data_room.feedbacks_room.data['data'].length).fill(true).map((_, i) => <div key={i}>{i+1}) {data_room.feedbacks_room.data['data'][i]['login']}</div>) : ''} 

        
      <Button variant="secondary" className='button' onClick={handleShowNewUser}>Add user</Button>
      <Button variant="secondary" className='button' onClick={handleShowdeleteUser}>Delete user</Button>

      {/* <Button variant="secondary" className='button' >Update Task</Button> */}


      </Modal>

      <Modal
        show={showNewUser}
        onHide={handleCloseNewUser}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Users2</Modal.Title>
        </Modal.Header>
        {/* {ar(data_room.feedbacks_room.data) ? Array(data_room.feedbacks_room.data['data'].length).fill(true).map((_, i) => <div key={i}>{data_room.feedbacks_room.data['data'][i]['login']}</div>) : ''}  */}
        {ar(data_users.feedbacks_users.data) ? opt(data_users.feedbacks_users.data['data']) ? <Select options={options} onChange={setLogin}/> : '' :''} 
        
        {/* {ar(data_users.feedbacks_users.data) ? console.log(data_users.feedbacks_users.data['data']): ''} */}
      <Button variant="secondary" className='button' onClick={addUser}>Add new user</Button>
      {/* <Button variant="secondary" className='button' >Update Task</Button> */}

      </Modal>


      <Modal
        show={showdeleteUser}
        onHide={handleClosedeleteUser}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Users3</Modal.Title>
        </Modal.Header>
        {/* {ar(data_room.feedbacks_room.data) ? Array(data_room.feedbacks_room.data['data'].length).fill(true).map((_, i) => <div key={i}>{data_room.feedbacks_room.data['data'][i]['login']}</div>) : ''}  */}
        {ar(data_room.feedbacks_room.data) ? opt2(data_room.feedbacks_room.data['data']) ? <Select options={options2} onChange={setLogin}/> : '' :''} 

        
        {/* {ar(data_users.feedbacks_users.data) ? console.log(data_users.feedbacks_users.data['data']): ''} */}
      <Button variant="secondary" className='button' onClick={deleteUser}>Delete user</Button>
      {/* <Button variant="secondary" className='button' >Update Task</Button> */}

      </Modal>

    </div>
  )
});

export default DesksId
