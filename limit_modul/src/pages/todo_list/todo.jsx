// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, List, ListItem, ListItemText } from '@mui/material';

const TodoListQQ = () => {
  const [todos, setTodos] = useState([]); // Состояние для хранения списка задач
  const [newTodo, setNewTodo] = useState(''); // Состояние для новой задачи

  // Загрузка задач из базы данных при монтировании компонента
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
        const response = await axios.get(`http://localhost:8001/api/todo/all/author`);
        setTodos(response.data.data || []); // Устанавливаем список задач из ответа API
      } catch (error) {
        console.error('Ошибка загрузки задач:', error);
      }
    };

    fetchTodos();
  }, []);

  // Добавление новой задачи
  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return; // Проверяем, что поле не пустое

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      const response = await axios.post(`http://localhost:8001/api/todo/create`, {
        title: newTodo,
        status: 'Сделать', // Новая задача всегда создается со статусом "Сделать"
      });

      setTodos([...todos, response.data]); // Добавляем новую задачу в список
      setNewTodo(''); // Очищаем поле ввода
    } catch (error) {
      console.error('Ошибка добавления задачи:', error);
    }
  };

  // Обновление статуса задачи
  const handleToggleTodo = async (todoId, currentStatus) => {
    const newStatus = currentStatus === 'Сделать' ? 'Завершено' : 'Сделать';

    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      await axios.put(`http://localhost:8001/api/todo/update/${todoId}`, {
        status: newStatus,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === todoId ? { ...todo, status: newStatus } : todo
        )
      );
    } catch (error) {
      console.error('Ошибка обновления статуса задачи:', error);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Todo List
      </Typography>
      <form onSubmit={(e) => e.preventDefault()} style={{ marginBottom: '20px' }}>
        <TextField
          id="outlined-basic"
          label="Новая задача"
          variant="outlined"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleAddTodo}
          style={{ marginTop: '10px' }}
        >
          Добавить
        </Button>
      </form>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            style={{
              backgroundColor: todo.status === 'Завершено' ? '#d9edda' : 'white',
              marginBottom: '10px',
              borderRadius: '5px',
              padding: '10px',
            }}
          >
            <ListItemText
              primary={
                <span
                  style={{
                    textDecoration: todo.status === 'Завершено' ? 'line-through' : 'none',
                    cursor: 'pointer',
                    color:'black'
                  }}
                  onClick={() => handleToggleTodo(todo.id, todo.status)}
                >
                  {todo.title}
                </span>
              }
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default TodoListQQ;