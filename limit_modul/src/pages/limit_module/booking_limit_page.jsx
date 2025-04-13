import '../../App.css'
import React, {useState, useEffect} from 'react';

import {observer} from 'mobx-react-lite';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CardProfile from '../profile_page';
import Company from './company_page';
// import Button from 'react-bootstrap/Button';
import Button from '@mui/material/Button';
import { Routes, Route, useParams } from 'react-router-dom';

import { IoIosArrowBack } from "react-icons/io";
// import { store } from '../store';
import { useNavigate } from "react-router-dom";
import BookingLimit from './booking_limit';


const BookingLimitPage = observer(() => {
  // console.log(comp_id)

  const navigate = useNavigate();


  let { id } = useParams()

  function book_lim(id){
    console.log(id)
    // console.log(priority['value'])
    // const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${priority['value']}`, {
    //   headers: {
    //     "access-control-allow-origin":"http://localhost:8001/",
    //     "Authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzEwNTA5OTQsImlhdCI6MTczMTAwNzc5NCwidXNlcl9pZCI6MX0.wzxQLFtPZYdYzk8F9Ue2ameXIvsAYpizT0RStU3vSuU`,
    //   }})

    navigate(`/company/bookinglimit/${id}`, { relative: "path" })
    }

  return (
    <>
    <div style={{display: 'flex', justifyContent:'center'}} className="back_ground_table">

      <BookingLimit></BookingLimit>
  </div>

    </>

  )
});

export default BookingLimitPage
