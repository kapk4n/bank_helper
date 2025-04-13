import * as React from 'react';
import { Button, Paper, Box, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Container } from '@mui/material';
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

export default function PassTest() {
  const ids = useParams('id');

  // Состояния для данных
  const [allTasks, setAllTasks] = useState([]);
  const [taskVariants, setTaskVariants] = useState({});
  const [selectedVariants, setSelectedVariants] = useState({});

  useEffect(() => {
    const fetchTasks = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      try {
        // Получаем все вопросы
        const tasksResponse = await axios.get(`http://localhost:8001/api/tasks/byid/task/${ids['test_id']}`)
        .catch((error) => {
          window.location.replace('/employe_tests')
          console.error("Ошибка загрузки данных:", error);
        })
        setAllTasks(tasksResponse.data.data)


        // Загружаем варианты ответов для каждого вопроса
        const variantsData = {};
        for (let task of tasksResponse.data.data) {
          const variantsResponse = await axios.get(`http://localhost:8001/api/tasks/variants/${task.task_id}`);
          variantsData[task.task_id] = variantsResponse.data.data;
        }
        setTaskVariants(variantsData);

      } catch (error) {
        console.error("Ошибка при загрузке теста:", error);
      }
    };

    fetchTasks();
  }, [ids]);

  const handleVariantChange = (taskId, variantId) => {
    setSelectedVariants({
      ...selectedVariants,
      [taskId]: variantId
    });
  };

  const handleSubmit = async () => {
    try {
      const responses = allTasks.map(task => ({
        id_task: task.task_id,
        id_task_variant: selectedVariants[task.task_id]
      }));

      await axios.post('http://localhost:8001/api/tasks/create/result', { responses });
      alert('Тестирование завершено');
    } catch (error) {
      console.error("Ошибка при отправке ответов:", error);
      alert('Ошибка при отправке ответов');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>Прохождение теста</Typography>

      {allTasks.map((task, index) => (
        <Paper key={task.task_id} sx={{ p: 3, mb: 2 }}>
          <FormControl component="fieldset">
            <FormLabel component="legend" sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {index + 1}. {task.task_question}
            </FormLabel>
            <RadioGroup
              name={`question-${task.task_id}`}
              value={selectedVariants[task.task_id] || ''}
              onChange={(e) => handleVariantChange(task.task_id, e.target.value)}
            >
              {taskVariants[task.task_id]?.map((variant) => (
                <FormControlLabel
                  key={variant.task_variants_id}
                  value={variant.task_variants_id}
                  control={<Radio />}
                  label={variant.task_variant}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
      ))}

      <Box textAlign="center" sx={{ mt: 4 }}>
        <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
          Завершить тестирование
        </Button>
      </Box>
    </Container>
  );
}