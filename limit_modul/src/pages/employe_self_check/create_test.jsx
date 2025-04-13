import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import "../../App.css";
import { observer } from 'mobx-react-lite';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TaskListView from "./list_of_tasks";

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

export const CreateTestPage = observer(() => {
  const today = new Date();
  const test_id_input = useParams('id');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const navigate = useNavigate();
  const [limitDateInput, setLimitDateInput] = useState(dayjs(today));

  // Состояние для полей ввода вариантов ответа
  const [inputFields, setInputFields] = useState([
    { id: 1, value: '' }
  ]);

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
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const CreateTest = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const test_id = Number(test_id_input.id); // Получаем ID теста из URL и преобразуем в число

      // Собираем строку из значений inputFields, разделенных '±'
      const task_variants = inputFields.map(field => field.value).join('±');
      const correct_variant = group_input; // Теперь correct_variant - это просто строка с правильным ответом

      await axios.post(`http://localhost:8001/api/tasks/create`, {
        task_question: task_question_input,
        test_id,
        task_variant: task_variants, // Передаем строку с вариантами
        correct_variant, // Передаем правильный вариант
      });

      location.reload();  // Перезагружаем страницу, а не переходим по ссылке
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
      })
      .catch((error) => {
        window.location.replace('/employe_tests')
        console.error("Ошибка загрузки данных:", error);
      })
      
      let data = await api_response;
      setFeedbacksTests(data);
    }
    fetchArticles()
  }, [])

  const data_test = { feedbacks_test };

  function ar(data) {
    if (data != undefined) {
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
                  <MenuItem value={field.value} key={field.id + '1'}>
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

      <div
        className="back_ground_table"
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '30px' }}
      >
        <Card style={{ maxWidth: 1200, width: 1200 }} className='cardHeader'>
          <CardContent style={{ padding: '5px 10px', backgroundColor: 'rgb(0,71,200)' }}>
            <div style={{ fontSize: 14, color: 'white' }}>
              Список вопросов
            </div>
          </CardContent>
          <CardContent style={{ display: 'flex', alignItems: 'flex-end', flexDirection: 'column', padding: '10px 0px' }}>
            <Typography component={'span'} style={{ fontSize: 14, display: 'flex', paddingRight: '25px' }}>
              <Button onClick={handleOpen2}>Создать вопрос</Button>
            </Typography>
            <Typography component={'span'} style={{ fontSize: 14, display: 'flex', paddingRight: '25px', flexDirection: 'column' }}>
              {
                ar(data_test.feedbacks_test.data?.data) ?
                  data_test.feedbacks_test.data['data'].map((_, index) => <TaskListView {...data_test.feedbacks_test.data['data'][index]} />)
                  : null
              }
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
});

export default CreateTestPage;