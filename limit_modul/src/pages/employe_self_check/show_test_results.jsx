import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, Paper } from '@mui/material';
import axios from "axios";
import { useState, useEffect } from "react";
import { Box } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useParams } from 'react-router-dom';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';


export default function StandardImageList() {
  const ids = useParams('id')

  const [feedbacks_all_tasks, setFeedbacksAllTasks] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksAllTasks([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/byid/task/${ids['test_id']}`, {
      })
      .catch((error) => {
        window.location.replace('/employe_tests')
        console.error("Ошибка загрузки данных:", error);
      })
      let data = await api_response;
      setFeedbacksAllTasks(data);
    }
    fetchArticles()
    }, [])

  const data_all_tasks = {feedbacks_all_tasks};

  const [feedbacks_task, setFeedbacksTasks] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksTasks([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${ids['id']}`, {
      });
      let data = await api_response;
      setFeedbacksTasks(data);
    }
    fetchArticles()
    }, [])

  const data_task = {feedbacks_task};


  const [feedbacks_task_variants, setFeedbacksTasksVariants] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksTasksVariants([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/variants/${ids['id']}`, {
      });
      let data = await api_response;
      setFeedbacksTasksVariants(data);
    }
    fetchArticles()
    }, [])

  const data_task_variants = {feedbacks_task_variants};


 const [feedbacks_task_result, setFeedbacksTasksResult] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksTasksResult([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/result/users/task/${ids['id']}`, {
      });
      let data = await api_response;
      setFeedbacksTasksResult(data);
    }
    fetchArticles()
    }, [])

  const data_task_result = {feedbacks_task_result};



  function ar(data){
    if (data != undefined){
      return true
    }
  }

  function correct_check(data, curent_variant, chosen_variant){
    if (data == true){
        return <CheckIcon color='success'/>
    }
    else{
      if (curent_variant == chosen_variant){
        return  <CancelIcon color='error'/>
      }
    }
  }

  let len_data = 0
  if (data_all_tasks.feedbacks_all_tasks.data != undefined){
    len_data = data_all_tasks.feedbacks_all_tasks.data['data'].length
  }

  return (
    <>
    {ar(data_all_tasks.feedbacks_all_tasks.data) & ar(data_task.feedbacks_task.data) & ar(data_task_variants.feedbacks_task_variants.data) & ar(data_task_result.feedbacks_task_result.data) ?
    
    <div style={{display:'flex', justifyContent:'space-between', paddingLeft:'60px', paddingRight:'10px', paddingTop:'20px'}}>
        <Box>
            <FormControl>
              <FormLabel id="demo-radio-buttons-group-label">{data_task.feedbacks_task.data['data'][0]['task_question']}</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={data_task_result.feedbacks_task_result.data['data'][0]['chosen_variant']}
                name="radio-buttons-group"
              >
                {data_task_variants.feedbacks_task_variants.data['data'].map((item, index) => (
                    <FormControlLabel style={{color:'black'}} value={item['task_variants_id']} control={<Radio disabled/>} label={<>{item['task_variant']} {correct_check(item['correct_variant'],item['task_variants_id'], data_task_result.feedbacks_task_result.data['data'][0]['chosen_variant'])}
                    </>} />
                ))}
              </RadioGroup>
            </FormControl>
        </Box>
        <Box sx={{display: 'flex', flexWrap: 'wrap', '& > :not(style)': {m: 1, width: 292, height: 70*(Math.floor(len_data/4)+1),}, justifyContent:'end', paddingRight:'10px' }}>
            <Paper elevation={3}>
                <div style={{display:'flex', justifyContent:'center', paddingTop:'5px'}}>Навигация по тесту</div>
                <ImageList sx={{ paddingLeft:'10px', paddingTop:'10px', width: 280, height: 60*(Math.floor(len_data/4)+1) }} cols={4} rowHeight={10}>
                    {data_all_tasks.feedbacks_all_tasks.data['data'].map((item, index) => (
                      <ImageListItem key={item.img}>
                        <Button style={{width:'50px', height:'50px'}} variant="contained" href={`/test/show/results/${item['task_id']}/${ids['test_id']}`}><div>{index+1}</div></Button>
                      </ImageListItem>
                    ))}
                </ImageList>
            </Paper>
        </Box>
    </div>
    :null
    }
    </>
  );
}

