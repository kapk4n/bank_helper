import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {useState} from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import { NumericFormat } from 'react-number-format'
import TextField from '@mui/material/TextField'

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


export default function BookingSubLimit() {
  const today = new Date();
  let is_invalid = true
  const [limitSumInput, setLimitSumInput] = useState('');
  const [limitDateInput, setLimitDateInput] = useState(dayjs(today));
  const [visibleItem, setVisibleItem] = useState('');
  const handleClose = () => setOpen(false);
  const handleOpen = () => {
    if (limitSumInput !== '' & limitDateInput !== ''){
      is_invalid = false;
      setOpen(true);
      console.log(is_invalid)
    }
    else{
      is_invalid = true;
      setOpen(false);
      console.log(is_invalid)
    }
  }
  const [open, setOpen] = React.useState(false);
  


  return (
    <>
      <div style={{ display: 'flex', justifyContent:'center', flexDirection:'column', padding: '10px 10px'}}>
      <Modal
        open={(limitSumInput!=='' && limitDateInput!=='') ? open : false}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" component="h2" style={{fontSize: 14, color:'gray'}}>
            Подтверждение бронирования 
            {/* {visibleItem[1] === "loans_limit" && <>Кредитный лимит</>} {visibleItem[1] === "documentary_limit" && <>Документарный лимит</>}{visibleItem[1] === "factoring_limit" && <>Факторинговый лимит</>} */}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 1, fontSize: 18 }}>
            ГК Ромашка
          </Typography>
          <Typography id="modal-modal-description" component="h2" sx={{ mt: 1,  }}>
            <div style={{ display: 'flex', justifyContent:'start', flexDirection:'row', width:'300px', paddingBottom:'15px'}}>
                <div style={{ display: 'flex', flexDirection:'column', justifyContent:'flex-start', width:'100px', color:'gray', fontSize:14}}>
                  <div style={{paddingTop:'2px'}}>
                    Заемщик:
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
                    ООО Ромашка
                  </div>
                  <div>
                      {visibleItem[1] === "loans_limit" && <>Кредитный лимит</>} {visibleItem[1] === "documentary_limit" && <>Документарный лимит</>}{visibleItem[1] === "factoring_limit" && <>Факторинговый лимит</>}
                  </div>
                  <div>
                    {limitSumInput} ₽
                  </div>
                  <div>
                    до {dayjs(limitDateInput).format('DD.MM.YYYY')}
                  </div>
                </div>
            </div>
            <div style={{ display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
            <Button variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'gray', color:'white'}} onClick={handleClose}>Отмена</Button>
            <Button    sx={{textTransform: "none",}} variant="contained" style={{fontSize:'14px', width: '47%', height:'60px', backgroundColor:'#f56e29', color:'white'}} onClick={handleClose}>Забронировать</Button>
            </div>
          </Typography>
        </Box>
      </Modal>

      <div>
          <Card style={{ border: "none", boxShadow: "none" }} >
                <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                      <Typography component={'span'} gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                        Бронирование сделки
                      </Typography>
                </CardContent>
                <CardHeader
                      title="ООО Ромашка"
                      subheaderTypographyProps={{fontSize:'12px'}}
                      titleTypographyProps={{fontSize:'18px'}}
                      subheader="01.11.2023-05.12.2026"
                />
          </Card>
          <Card style={{ border: "none", boxShadow: "none",display:'flex', width: '100%' }}>
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
                              <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" onClick={() => setVisibleItem(["view","loans_limit"])} size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}}>Забронировать</Button></div>
                          </div>
                      </div>
                      <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                              &emsp;
                              <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" onClick={() => setVisibleItem(["view","documentary_limit"])} size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}}>Забронировать</Button></div>
                          </div>
                      </div>
                      <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{paddingTop:'9px'}}><BorderLinearProgress variant="determinate" value={50} style={{width:'120px', display:'flex'}} /></div>
                              &emsp;
                              <div style={{fontSize:'16px', color:'black'}}> 26 000 000 Р </div>
                              <div style={{fontSize:'12px', color:'gray', paddingTop:'4px'}}>&nbsp; из 150 000 000 Р</div>
                              &emsp;
                              <div style={{paddingTop: '1px', width:'200px'}}><Button variant='contained' color="secondary" onClick={() => setVisibleItem(["view","factoring_limit"])} size='small' style={{height:'15px', width:'200px', backgroundColor:'#f56e29'}}>Забронировать</Button></div>
                          </div>
                      </div>
                    </div>

                    }
                    title={<>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Кредитные лимиты</div>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Документарные лимиты</div>
                              <div style={{fontSize:'16px', color:'black', width: '186px'}}> Факторинговые лимиты</div>
                          </>}
                style={{alightItems:'flex-end', width: '800px'}}/>
          </Card>

          <div className='div_hight_2'></div>
        {visibleItem[0] === "view" && 
         <div>
                <Card style={{ border: "none", boxShadow: "none" }} >
                      <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                            <Typography component={'span'} gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                              
                              {visibleItem[1] === "loans_limit" && <>Кредитный лимит</>}
                              {visibleItem[1] === "documentary_limit" && <>Документарный лимит</>}
                              {visibleItem[1] === "factoring_limit" && <>Факторинговый лимит</>}
                            </Typography>
                      </CardContent>
                      <CardHeader
                            title="Сумма лимита"
                            subheaderTypographyProps={{fontSize:'12px'}}
                            titleTypographyProps={{fontSize:'12px', color:'gray'}}
                            subheader={
                              <NumericFormat
                                  value={limitSumInput}
                                  customInput={TextField}
                                  InputProps={{
                                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                                  }}
                                  allowNegative={false}
                                  error = {limitSumInput!=='' ? false : true}
                                  helperText={limitSumInput!=='' ? '' : "Не должно быть пустым"}
                                  thousandSeparator = " "
                                  onChange={(e) => setLimitSumInput(e.target.value)}
                                />
                            }

                      />
                </Card>
                <Card style={{ border: "none", boxShadow: "none",display:'flex', width: '100%' }}>
                <CardHeader
                          action={<></>}
                          title={<>
                                <div style={{fontSize:'12px', color:'gray', width: '286px'}}> Срок лимита 01.11.2023-05.12.2024</div>
                                <div style={{fontSize:'16px', color:'black', width: '286px'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']}>
                                            <DatePicker disablePast value={limitDateInput} onChange={(newValue) => setLimitDateInput(newValue)} label="Введите срок лимита"/>
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </div>
                                </>}
                      style={{alightItems:'flex-end', width: '800px'}}/>
                </Card>
                <Card style={{ border: "none", boxShadow: "none",display:'flex', width: '100%' }}>
                <CardHeader
                          action={<></>}
                          title={<>
                                <div style={{fontSize:'16px', color:'black', width: '100%'}}>
                                    <Button variant="contained" style={{fontSize:'16px', width: '100%', height:'60px', backgroundColor:'#f56e29', color:'white'}} onClick={handleOpen}>Забронировать сделку</Button>
                                </div>
                                </>}
                      style={{alightItems:'flex-end', width: '800px'}}/>
                </Card>
        </div>
      }
      

{/* function About(props) {
  const [visibleItem, setVisibleItem] = useState('');
  return (
    <div>
      <button onClick={() => setVisibleItem("website")}>
        Show Website Develpment
      </button>
      <button onClick={() => setVisibleItem("wordpress")}>
        Show Wordpress Develpment
      </button>
      <button onClick={() => setVisibleItem("ecommerce")}>
        Show Ecommerce Development
      </button>
      
      {visibleItem === "website" && 
        <div>
          <h2>Wordpress Development</h2>
          <p>Info about Wordpress and all the things I can do with it</p>
        </div>
      }     
      
      {visibleItem === "wordpress" && 
        <div>
          <h2>Ecommerce Development</h2>
          <p>I can do eccomerce things too</p>
        </div>
      }      
      
      {visibleItem === "ecommerce" && 
         <div>
          <h2>Website Development</h2>
          <p>Info about Webdev</p>
        </div>
      }
      
    </div>
   );
}

ReactDOM.render(
  <About/>,
  document.getElementById("react")
); */}

          {/* <Card style={{ border: "none", boxShadow: "none" }} >
                <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                      <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'white'}}>
                        Документарный лимит
                      </Typography>
                </CardContent>
                <CardHeader
                      title="ООО Ромашка"
                      subheaderTypographyProps={{fontSize:'12px'}}
                      titleTypographyProps={{fontSize:'12px'}}
                      subheader="01.11.2023-05.12.2026"
                />
          </Card> */}


        </div>
      </div>
    </>
  );
}
