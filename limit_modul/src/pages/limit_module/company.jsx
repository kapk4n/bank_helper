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


const CompanyContent = observer(() => {
  const navigate = useNavigate();
  let { id } = useParams()

  function book_lim(id){
    navigate(`/limit_module/company/bookinglimit/${id}`, { relative: "path" })
    }

  return (
    <>
      <div className='GK_Title' style={{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <div style={{display: 'flex', flexDirection:'column', justifyContent:'space-between'}}>
            <div>
              <Button variant="text" href='/limit_module' ><IoIosArrowBack />Назад</Button>
            </div>  
            <div style={{}}>
                ГК Цветочек 
            </div>
          </div>
          <div style={{'display': 'flex', 'flexDirection':'row'}}>
              {/* <Button variant='contained' color="secondary" onClick={() => book_lim(id)} size='large'>Забронировать</Button> */}
              <Button variant="contained" style={{fontSize:'20px', width: '100%', height:'100%', backgroundColor:'#f56e29', color:'white'}} onClick={() => book_lim(id)}>Забронировать сделку</Button>

          </div>
      </div>
      <br></br>
      <div className="back_ground_table" style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
          <Company/>
      </div>
    
    </>

  )
});

export default CompanyContent
