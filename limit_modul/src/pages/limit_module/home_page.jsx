import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
import "../../App.css"
import { observer } from 'mobx-react-lite';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Select from 'react-select'
import { useNavigate } from "react-router-dom";

export const Home = observer(() => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();

  const options = [
    { value: '1', label: 'Chocolate' },
    { value: '2', label: 'Strawberry' },
    { value: '3', label: 'Vanilla' }
  ]

  

  function companyShow(priority){
    console.log(priority['value'])
    const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${priority['value']}`, {
      headers: {
        "access-control-allow-origin":"http://localhost:8001/",
        "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
      }})
    navigate(`/limit_module/company/${priority['value']}`, { relative: "path" })
    }



  return (
      <> 
      <div className="back_ground_table">
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Offcanvas</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            Some text as placeholder. In real life you can have the elements you
            have chosen. Like, text, images, lists, etc.
          </Offcanvas.Body>
        </Offcanvas>

        <div style={{display: 'flex', justifyContent:'center', width: ' 100%'}}>
        <Select  onChange={(choice) => companyShow(choice)} options={options} className='ex1'/>
        </div>
      </div>
    </>

  )

});

export default Home;
