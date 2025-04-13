import React, { Component, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "../../App.css"
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";
import { Button, ButtonBase, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import TestListView from "./list_of_tests";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Popover from '@mui/material/Popover';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const TestHomePage = observer(() => {
  const today = new Date();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [limitDateInput, setLimitDateInput] = useState(dayjs(today));

  const [tittle_input, setTittle] = React.useState('');
  const handleChangeTittle = (event) => {
    setTittle(event.target.value);
  };

  const [category_input, setCategory] = React.useState('');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  const [group_input, setGroup] = React.useState('');
  const handleChangeGroup = (event) => {
    setGroup(event.target.value);
  };

  const [open, setOpen2] = React.useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);
  


  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open_pover = Boolean(anchorEl);


    const CreateTest = async (e) => {
      e.preventDefault();
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      try {
        const test_title = tittle_input
        const test_category = category_input
        const group_id = group_input
        const enddate = limitDateInput
        

        // const login = employee_id2
        const response = await axios.post(`http://localhost:8001/api/test/create`, 
        {
          test_title, test_category, group_id, enddate
          // , description, login, priority, status
        });
        console.log(response.data.id)
        navigate(`/test/create/${response.data.id}`)
      } catch (error) {
        console.error(error);
      }
    };

    const [feedbacks, setFeedbacks] = useState([]);
      useEffect(() => {
    
        const fetchArticles = async () => {
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    
          setFeedbacks([]);
          const api_response = axios.get(`http://localhost:8001/api/profile/groups`, {
          });
          let data = await api_response;
          setFeedbacks(data);
        }
        fetchArticles()
        }, [])
    
        const data = {feedbacks};


    const [feedbacks_test, setFeedbacksTests] = useState([]);
    useEffect(() => {

      const fetchArticles = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

        setFeedbacksTests([]);
        const api_response = axios.get(`http://localhost:8001/api/test/all/users`, {
        });
        let data = await api_response;
        setFeedbacksTests(data);
      }
      fetchArticles()
      }, [])

    const data_test = {feedbacks_test};
    

    const [feedbacks_percentage, setFeedbacksPercentage] = useState([]);
    useEffect(() => {
  
      const fetchArticles = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
  
        setFeedbacksPercentage([]);
        const api_response = axios.get(`http://localhost:8001/api/test/percent/2`, {
        });
        let data = await api_response;
        setFeedbacksPercentage(data);
      }
      fetchArticles()
      }, [])
  
      const data_percentage = {feedbacks_percentage};




    // console.log(data_test.feedbacks_test.data)

    function ar(data){
      if (data != undefined){
        return true
      }
    }

  return (
      <> 
      <Modal
        open={open}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Создание теста
          </Typography>
          <Typography id="modal-modal-tittle-input" sx={{ mt: 2 }}>
              <TextField required id="outlined-required" value={tittle_input} onChange={handleChangeTittle} label="Название теста" />
          </Typography>
          <Typography id="modal-modal-description-input" sx={{ mt: 2 }}>
              <TextField required id="outlined-required" value={category_input} onChange={handleChangeCategory} label="Описание теста" />
          </Typography>
          {ar(data.feedbacks.data) ? 
              <Typography id="modal-modal-group-input" sx={{ mt: 2 }}>
                {console.log(group_input)}
                      <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
                        <InputLabel id="demo-select-small-label">Выбор группы</InputLabel>
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={group_input}
                          label="Выбор группы"
                          onChange={handleChangeGroup}
                        >
                          {data.feedbacks.data['data'].map((_, index) => 
                            <MenuItem value={data.feedbacks.data['data'][index]['group_id']}>
                                {data.feedbacks.data['data'][index]['group_name']} 
                                <InfoOutlinedIcon 
                                      aria-owns={open_pover ? 'mouse-over-popover' : undefined}
                                      aria-haspopup="true"
                                      onMouseEnter={handlePopoverOpen}
                                      onMouseLeave={handlePopoverClose}
                                style={{hover:'1'}} />
                                <Popover
                                    id="mouse-over-popover"
                                    sx={{ pointerEvents: 'none' }}
                                    open={open_pover}
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'bottom',
                                      horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'left',
                                    }}
                                    onClose={handlePopoverClose}
                                    disableRestoreFocus
                                  >
                                    <Typography sx={{ p: 1 }}>I use Popover.</Typography>
                                  </Popover>
                            </MenuItem>)} 
                        </Select>
                      </FormControl>
                      <Button href='/test/create' style={{fontSize:'12px'}}> Создать группу </Button>
              </Typography>
          : null
          }
          <Typography id="modal-modal-description-input" sx={{ mt: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                      <DatePicker disablePast value={limitDateInput} onChange={(newValue) => setLimitDateInput(newValue)} label="Введите срок лимита"/>
                  </DemoContainer>
              </LocalizationProvider>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={CreateTest}> Создать тест </Button>
          </Typography>        
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button href='/test/create'> Открыть в новом окне </Button>
          </Typography>
        </Box>
      </Modal>



      <div className="back_ground_table" style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', paddingTop: '30px'}}>
          <Card style={{ maxWidth: 1200, width: 1200}} className='cardHeader'  >
              <CardContent style={{hight:'10px', padding:'5px 10px', backgroundColor:'rgb(0,71,200)'}}>
                          <div style={{fontSize: 14,hight:'10px', color:'white'}}>
                            Список тестов
                          </div>
              </CardContent>
              <CardContent style={{display:'flex', alignItems:'flex-end', flexDirection:'column', padding:'10px 0px'}}>
                      <Typography component={'span'} style={{fontSize: 14,hight:'10px', display:'flex', paddingRight:'25px'}}>
                          <Button onClick={() => handleOpen2()}>Create test</Button>
                      </Typography>
              </CardContent>
              <CardContent style={{hight:'10px', display:'flex', alignItems:'center', flexDirection:'column'}}>
                      <Typography component={'span'} gutterBottom sx={{fontSize: 14,hight:'10px'}}>
                        {ar(data_test.feedbacks_test.data) & ar(data_percentage.feedbacks_percentage.data) ? 
                        data_test.feedbacks_test.data['data'].map((_, index) => <TestListView {...data_test.feedbacks_test.data['data'][index]} />)
                      : null}
                      </Typography>
                </CardContent>
          </Card>
      </div>
    </>

  )

});

export default TestHomePage;
