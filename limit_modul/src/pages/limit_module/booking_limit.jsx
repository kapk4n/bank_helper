import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import BookingSubLimit from './bookingSubLimit';
import Button from '@mui/material/Button';
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Routes, Route, useParams } from 'react-router-dom';

export default function BookingLimit() {

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#f56e29',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));


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

    navigate(`/limit_module/company/${id}`, { relative: "path" })
    }



  return (
    <div style={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
      <div>
          <Button variant="text" onClick={() => book_lim(id)} style={{padding:'0 3%'}} ><IoIosArrowBack />Назад</Button>
          <div className='GK_Title_2'>
              <div style={{}}>
                  ГК Цветочек 
              </div>
          </div>
          <br></br>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardContent style={{hight:'10px', padding:'5px 10px'}}>
                      <Typography component={'span'} gutterBottom sx={{fontSize: 14,hight:'10px'}}>
                        <BookingSubLimit/>
                      </Typography>
                </CardContent>
          </Card>
      </div>
      {/* <div className='div_hight'></div>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-end'}}>
                              <div style={{fontSize:'24px', color:'black'}}>26 000 000 Р</div>
                              <div style={{fontSize:'14px', color:'gray'}}>из 150 000 000 Р</div>
                          </div>
                          <div>
                              <BorderLinearProgress variant="determinate" value={50} style={{width:'300px', display:'flex'}} />
                          </div>
                      </div>
                    }
                    title="Доступно"
                style={{alightItems:'flex-end'}}/>
          </Card>
      </div>
      <div className='div_hight_2'></div>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                      <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                        Фактическая задолженность
                      </Typography>
                </CardContent>
                <CardHeader
                      action={ <div style={{fontSize:'24px', color:'gray'}}>150 000 000Р</div> }
                      title="ООО Тюльпан"
                      subheaderTypographyProps={{fontSize:'12px'}}
                      subheader="01.11.2023-05.12.2026"
                />
      </Card>
      </div>
      <div className='div_hight'></div>
      <div>
          <Card sx={{ maxWidth: 800, width:800}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                        <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Кредитные лимиты</div>
                              &emsp;
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'150px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                          </div>
                      </div>
                      <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Документарные лимиты</div>
                              &emsp;
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'150px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                          </div>
                      </div>
                      <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Факторинговые лимиты</div>
                              &emsp;
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'150px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                          </div>
                      </div>
                    </div>

                    }
                    title="Суб-лимиты"
                style={{alightItems:'flex-end'}}/>
          </Card>
      </div> */}
    </div>
  );
}

