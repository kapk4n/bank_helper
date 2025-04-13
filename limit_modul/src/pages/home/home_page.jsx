import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
import "../../App.css"
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";

export const MainHomePage = observer(() => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();



  function companyShow(priority){
    console.log(priority['value'])
    const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${priority['value']}`, {
      headers: {
        "access-control-allow-origin":"http://localhost:8001/",
        "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
      }})
    navigate(`/company/${priority['value']}`, { relative: "path" })
    }



  return (
      <> 
      lasmfl;masfl
    </>

  )

});

export default MainHomePage;
