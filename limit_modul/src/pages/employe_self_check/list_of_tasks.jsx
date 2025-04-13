import React, { Component } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from "react";
import "../../App.css"
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, CardHeader, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 400, // задаёт фиксированную высоту
  overflowY: 'auto', // включает вертикальную прокрутку, если содержимое превышает высоту
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 2,
};

export const TaskListView = observer((taskInfo) => {

  const CreateTest = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const task_question = task_question_input;
      const test_id = test_id_input;
      // Здесь group_input содержит выбранный вариант ответа,
      // который является строкой, введённой пользователем, его можно использовать как "правильный ответ".
      const correct_answer = group_input;
      const enddate = limitDateInput;

      const response = await axios.post(`http://localhost:8001/api/test/create`, {
        task_question, test_id, correct_answer, enddate
      });
      navigate('/test/create');
    } catch (error) {
      console.error(error);
    }
  };

  const [feedbacks_test, setFeedbacksTests] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksTests([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/byid/task/${test_id_input['id']}`, {
      });
      let data = await api_response;
      setFeedbacksTests(data);
    }
    fetchArticles()
    }, [])
  const data_test = {feedbacks_test};

  const [feedbacks_task, setFeedbacksTask] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksTask([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/byid/${taskInfo['task_id']}`, {
      });
      let data = await api_response;
      setFeedbacksTask(data);
    }
    fetchArticles()
    }, [])
  const data_task = {feedbacks_task};

  const DeleteTest = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.delete(`http://localhost:8001/api/tasks/delete/${taskInfo['task_id']}`, {
      });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  // http://localhost:8001/api/tasks/variants/2

  const [feedbacks_variants, setFeedbacksVariants] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacksVariants([]);
      const api_response = axios.get(`http://localhost:8001/api/tasks/variants/${taskInfo['task_id']}`, {
      });
      let data = await api_response;
      setFeedbacksVariants(data);
    }
    fetchArticles()
    }, [])

  const data_variants = {feedbacks_variants};

  function ar(data){
    if (data != undefined){
      return true
    }
  }

  const today = new Date();
  const test_id_input = useParams('id')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [limitDateInput, setLimitDateInput] = useState(dayjs(today));

  // Состояние для полей ввода вариантов ответа
  const [inputFields, setInputFields] = useState([]);

  // Состояние для выбранного правильного ответа (конкретно выбранное значение из inputFields)
  const [group_input, setGroup] = useState('');

  // Функция для добавления нового поля ввода варианта ответа
  const addField = () => {
    setInputFields([...inputFields, { id: inputFields.length + 1, value: '' }]);
  };

  // Функция для удаления последнего поля ввода варианта ответа
  const removeLastField = () => {
    if (inputFields.length > 1) {
      setInputFields(inputFields.slice(0, -1));
    }
  };

  // Функция для обработки изменения в одном из полей ввода вариантов ответа
  const handleChange = (id, event) => {
    const newFields = inputFields.map(field => {
      if (field.id === id) {
        return { ...field, value: event.target.value };
      }
      return field;
    });
    setInputFields(newFields);
  };

  // Состояние для вопроса
  const [task_question_input, setQuestion] = useState('');
  const handleChangeQuestion = (event) => {
    setQuestion(event.target.value);
  };

  // Состояние для категории теста (если необходимо)
  const [category_input, setCategory] = useState('');
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };

  // Обработчик изменения выбранного правильного ответа
  const handleChangeGroup = (event) => {
    setGroup(event.target.value);
  };

  // Функции для работы с модальными окнами
  const [open, setOpen2] = useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
    // Загрузка вариантов ответов при открытии модального окна
    if (data_variants.feedbacks_variants.data && data_test.feedbacks_test.data) {
      const variants = data_variants.feedbacks_variants.data['data'];
      const newInputFields = variants.map((variant, index) => ({
        id: index + 1,
        value: variant.task_variant
      }));
      setInputFields(newInputFields);
      // Автоматически выбираем правильный ответ, если он есть
      const correctVariant = variants.find(variant => variant.correct_variant);
      if (correctVariant) {
        setGroup(correctVariant.task_variant);
      }

      setQuestion(data_task.feedbacks_task.data['data'][0].task_question)
    }
  };
  const handleClose2 = () => setOpen2(false);


  const [open3, setOpen3] = useState(false);
  const handleClose3 = () => setOpen3(false);


  return (
      <> 
      {
        ar(data_test.feedbacks_test.data) & ar(data_variants.feedbacks_variants.data) ? <>
        
        <Modal
        open={open3}
        onClose={handleClose3}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <Button onClick={DeleteTest}>Удалить</Button>
          </Typography>
        </Box>
      </Modal>



        <Modal
        open={open}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Создание вопроса
          </Typography>
          <Typography id="modal-modal-tittle-input" sx={{ mt: 2 }}>
            <TextField 
              required 
              id="outlined-required" 
              value={task_question_input} 
              onChange={handleChangeQuestion} 
              label="Вопрос" 
            />
          </Typography>

          {inputFields.map(field => (
            <Typography id={`modal-modal-description-input-${field.id}`} sx={{ mt: 2 }} key={field.id}>
              <TextField 
                required 
                id={`outlined-required-${field.id}`} 
                value={field.value} 
                onChange={(event) => handleChange(field.id, event)} 
                label={`Вариант ответа ${field.id}`} 
              />
            </Typography>
          ))}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={addField} style={{ fontSize: '12px' }}>Добавить вариант ответа</Button>
            <Button onClick={removeLastField} style={{ fontSize: '12px' }} disabled={inputFields.length === 1}>Удалить последний вариант</Button>
          </Box>

          {/* Новый компонент Select, в котором выводятся введённые варианты ответа */}
          <Typography id="correct-answer-select-container" sx={{ mt: 2 }}>
            <FormControl sx={{ m: 1, minWidth: 200 }} size="small">
              <InputLabel id="correct-answer-select-label">Выбор правильного ответа</InputLabel>
              <Select
                labelId="correct-answer-select-label"
                id="correct-answer-select"
                value={group_input}
                label="Выбор правильного ответа"
                onChange={handleChangeGroup}
              >
                {inputFields.map(field => (
                  <MenuItem value={field.value} key={field.id}>
                    {field.value.trim() !== '' ? field.value : `Вариант ${field.id}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Typography>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button onClick={CreateTest}>Создать тест</Button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button href='/test/create'>Открыть в новом окне</Button>
          </Typography>
        </Box>
      </Modal>
        
      <div style={{paddingBottom:'5px'}}>
              <Card style={{ maxWidth: 1150, width: 1150}} >
                <CardHeader
                    action={
                      <div style={{display:'flex', flexDirection:'column', justifyContent:'right', alignItems:'flex-end'}}>
                        <div>
                          <div style={{display:'flex', flexDirection:'row', justifyContent:'right', alignItems:'flex-start'}}>
                              <div style={{fontSize:'13px', color:'black'}}> 
                                <Button onClick={handleOpen2}>Изменить вопрос</Button>
                              </div>
                              <div style={{fontSize:'13px', color:'black'}}> 
                                <Button onClick={setOpen3}><DeleteIcon style={{color:'red'}}/></Button>
                                
                              </div>
                          </div>
                      </div>
                    </div>
                    }
                    // title="123"
                    title={taskInfo['task_question']}
                />
            </Card>              
          </div>
        
        </>
      : null
      }
      
    </>

  )

});

export default TaskListView;