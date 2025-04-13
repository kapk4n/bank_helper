import React, { Component, useEffect} from "react";
import axios from "axios";
import { useState } from "react";
import "../../App.css"
// import { store } from '../store';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';

import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { useParams } from "react-router-dom";
import { observer } from 'mobx-react-lite';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import RecipeReviewCard from './limit_info.jsx';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import EditIcon from '@mui/icons-material/Edit';

const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


export const Company = observer(() => {
  const [currentInputValue, setCurrentInputValue] = useState('');
  const [currentInputValue2, setCurrentInputValue2] = useState('');


  const [show, setShow] = useState(false);
  const { id } = useParams()
  
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [open, setOpen] = React.useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleClose2 = () => setOpen2(false);
  const handleOpen2 = () => setOpen2(true);
  const [open2, setOpen2] = React.useState(false);



  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  let stri = ['Заявки на бронирование', 'Мои бронирования']
  let steps = ['Основная информация о лимите', 'Дополнительно', stri[0]];

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    // theme.palette.grey[200]
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




  const [feedbacks2, setFeedbacks2] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks2([]);
      // const url = 'https://url.abc.com/';
      const api_response = axios.get(`http://localhost:8001/api/profile/`, {
      });
      let data2 = await api_response;
        setFeedbacks2(data2);
    }
    fetchArticles()
          // setInterval(fetchArticles(), 2000)
    }, [])

    const data2 = {feedbacks2};

    // console.log(data['feedbacks'].data)
    // console.log(data)

  // console.log(JSON.stringify(taskStore.tasksFromDesk))
  // if (data.feedbacks.data != undefined){
  //   console.log(data['feedbacks'].data)
  // }
    function ar2(data2){
      if (data2 != undefined){
        // console.log(data)
        // let data2 = data
        return true
      }
    }




  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks([]);
      // const url = 'https://url.abc.com/';
      const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${id}`, {
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()
          // setInterval(fetchArticles(), 2000)
    }, [])

  const data = {feedbacks};

  function ar(data){
    if (data != undefined){
      return true
    }
  }


  return (
<>

    <div style={{display: 'flex', justifyContent:'center'}} className="back_ground_table">
</div>

<Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h2" style={{fontSize: 14, color:'gray'}}>
            <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
              <div>
                  Выдать транш
              </div>
              <div>
            <Button><EditIcon/></Button>
              </div>
            </div>
            {/* {visibleItem[1] === "loans_limit" && <>Кредитный лимит</>} {visibleItem[1] === "documentary_limit" && <>Документарный лимит</>}{visibleItem[1] === "factoring_limit" && <>Факторинговый лимит</>} */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 18 }}>
            ООО Ромашка2
          </Typography>
          <Typography id="modal-modal-description" component="h2" sx={{ mt: 1,  }}>
            <div style={{ display: 'flex', justifyContent:'start', flexDirection:'row', width:'300px', paddingBottom:'15px'}}>
                <div style={{ display: 'flex', flexDirection:'column', justifyContent:'flex-start', width:'100px', color:'gray', fontSize:14}}>
                  <div style={{paddingTop:'2px'}}>
                    Инициатор:
                  </div>
                  <div style={{paddingTop:'3px'}}>
                    Суб-лимит:
                  </div>
                  <div style={{paddingTop:'3px'}}>
                    Сумма:
                  </div>
                  <div style={{paddingTop:'3px'}}>
                    Срок:
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection:'column', justifyContent:'start'}}>
                  <div>
                  Шенфельдт Иван
                  </div>
                  <div>
                      Документарный лимит
                  </div>
                  <div>
                    1 000 000 ₽
                  </div>
                  <div>
                    до 01.01.2026
                  </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Button variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'gray', color:'white'}} onClick={handleClose2}>Закрыть</Button>
            <Button    sx={{textTransform: "none",}} variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'#f56e29', color:'white'}} onClick={handleClose2}>Отменить бронирование</Button>
            </div>
          </Typography>
        </Box>
      </Modal>





<Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h2" style={{fontSize: 14, color:'gray'}}>
            Выдать транш
            {/* {visibleItem[1] === "loans_limit" && <>Кредитный лимит</>} {visibleItem[1] === "documentary_limit" && <>Документарный лимит</>}{visibleItem[1] === "factoring_limit" && <>Факторинговый лимит</>} */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 18 }}>
            ООО Ромашка
          </Typography>
          <Typography id="modal-modal-description" component="h2" sx={{ mt: 1,  }}>
            <div style={{ display: 'flex', justifyContent:'start', flexDirection:'row', width:'300px', paddingBottom:'15px'}}>
                <div style={{ display: 'flex', flexDirection:'column', justifyContent:'flex-start', width:'100px', color:'gray', fontSize:14}}>
                  <div style={{paddingTop:'2px'}}>
                    Инициатор:
                  </div>
                  <div style={{paddingTop:'3px'}}>
                    Суб-лимит:
                  </div>
                  <div style={{paddingTop:'3px'}}>
                    Сумма:
                  </div>
                  <div style={{paddingTop:'3px'}}>
                    Срок:
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection:'column', justifyContent:'start'}}>
                  <div>
                  Шенфельдт Иван
                  </div>
                  <div>
                      Документарный лимит
                  </div>
                  <div>
                    1 000 000 ₽
                  </div>
                  <div>
                    до 01.01.2026
                  </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Button variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'gray', color:'white'}} onClick={handleClose}>Отмена</Button>
            <Button    sx={{textTransform: "none",}} variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'#f56e29', color:'white'}} onClick={handleClose}>Выдать</Button>
            </div>
          </Typography>
        </Box>
      </Modal>


    <Box sx={{ width: '57%'}}>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>

      <div>
        {activeStep == 0 ? (
          <React.Fragment>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}  style={{ display: 'flex', justifyContent:'center'}}>
            <RecipeReviewCard  style={{ display: 'flex', justifyContent:'center'}}/>
          </Box>
        </React.Fragment> 
        ) : 
        (activeStep == 1 ? (
          <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <div style={{color:'black'}}>Что-то дополнительное</div>
            </Box>
          </React.Fragment>
          ): (

          <div>
            {data2.feedbacks2.data.data[0].login === 'backOffice' ? (
              <React.Fragment>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}  style={{ display: 'flex', justifyContent:'center'}}>
            <div style={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
                <div>
                    <Card sx={{ maxWidth: 800, width:800}} >
                          <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                                <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                                  Заявки на бронирование
                                </Typography>
                          </CardContent>
                        <CardHeader
                                  action={
                                    <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                                      <div>
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                                            <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                                            &emsp;
                                            <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                                            <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                                            &emsp;
                                            <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}} onClick={handleOpen}>Выдать транш</Button></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                                            <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                                            &emsp;
                                            <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                                            <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                                            &emsp;
                                            <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}} onClick={handleOpen}>Выдать транш</Button></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                                            <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                                            &emsp;
                                            <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                                            <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                                            &emsp;
                                            <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}} onClick={handleOpen}>Выдать транш</Button></div>
                                        </div>
                                    </div>
                                  </div>

                                  }
                                  title={<>
                                            <div style={{fontSize:'16px', color:'black', width: '186px'}}> Шенфельдт Иван</div>
                                            <div style={{fontSize:'16px', color:'black', width: '186px'}}> Схимников Сергей</div>
                                            <div style={{fontSize:'16px', color:'black', width: '186px'}}> Дмитриева Татьяна</div>
                                        </>}
                              style={{alightItems:'flex-end', width: '800px'}}/>

                    </Card>
                </div>
      </div>
            </Box>
          </React.Fragment>
                
            ):
            (
<React.Fragment>
                          {
                        console.log(data2.feedbacks2.data.data[0].login)

                          }
                          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}  style={{ display: 'flex', justifyContent:'center'}}>
                          <div style={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
                              <div>
                                  <Card sx={{ maxWidth: 800, width:800}} >
                                        <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                                              <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                                                Заявки на бронирование
                                              </Typography>
                                        </CardContent>
                                      <CardHeader
                                                action={
                                                  <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                                                    <div>
                                                      <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                                                          <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                                                          &emsp;
                                                          <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                                                          <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                                                          &emsp;
                                                          <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}} onClick={handleOpen2}>Подробнее</Button></div>
                                                      </div>
                                                  </div>
                                                  <div>
                                                      <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                                                          <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                                                          &emsp;
                                                          <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                                                          <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                                                          &emsp;
                                                          <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}} onClick={handleOpen2}>Подробнее</Button></div>
                                                      </div>
                                                  </div>
                                                  <div>
                                                      <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                                                          <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                                                          &emsp;
                                                          <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                                                          <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                                                          &emsp;
                                                          <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}} onClick={handleOpen2}>Подробнее</Button></div>
                                                      </div>
                                                  </div>
                                                </div>

                                                }
                                                title={<>
                                                          <div style={{fontSize:'16px', color:'black', width: '186px'}}> Заявка №20241101-12</div>
                                                          <div style={{fontSize:'16px', color:'black', width: '186px'}}> Заявка №20241103-12</div>
                                                          <div style={{fontSize:'16px', color:'black', width: '186px'}}> Заявка №20241103-13</div>
                                                      </>}
                                            style={{alightItems:'flex-end', width: '800px'}}/>

                                  </Card>
                              </div>
                    </div>
                          </Box>
                        </React.Fragment>
              
            )
          
          }



          </div>




        ))}
      </div>
    </Box>

    

    </>
  );
})

export default Company;
