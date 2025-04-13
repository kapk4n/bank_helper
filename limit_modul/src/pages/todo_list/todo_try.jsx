// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, List, ListItem, ListItemText, Typography, Container } from '@mui/material';

const SelectAllTransferList = () => {
  const [newTodo, setNewTodo] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      const response = await axios.get(`http://localhost:8001/api/todo/all/author`);
      setTodos(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      await axios.post(`http://localhost:8001/api/todo/create`, { title: newTodo });
      setNewTodo('');
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTodo = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Сделать' ? 'Завершено' : 'Сделать';
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
      await axios.put(`http://localhost:8001/api/todo/update/${id}`, { status: newStatus });
      fetchTodos();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h2" gutterBottom>
        Todo List
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleUpdate}>
        Add Todo
      </Button>
      <List>
        {todos.map((todo) => (
          <ListItem
            key={todo.id}
            button
            onClick={() => toggleTodo(todo.id, todo.status)}
            style={{
              textDecoration: todo.status === 'Завершено' ? 'line-through' : 'none',
              marginBottom: '8px',
            }}
          >
            <ListItemText primary={todo.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default SelectAllTransferList;