// src/components/TodoList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';




const TodoList = () => {
  // const { todos, addTodo, removeTodo, toggleTodo } = useTodoStore();
  // const { todos, addTodo, removeTodo, toggleTodo } =
  let todos = ['1123', 'qwe']
  const [newTodo, setNewTodo] = useState('');



  const handleUpdate = async (e) => {
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const title = newTodo
      // const status = status2['value']
      // const login = employee_id2
      const response = await axios.post(`http://localhost:8001/api/todo/create`, 
      {
        title
        // , description, login, priority, status
      });
      location.reload();
    } catch (error) {
      console.error(error);
    }
  };


  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks([]);
      const api_response = axios.get(`http://localhost:8001/api/todo/all/author`, {
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()
    }, [])

    const data = {feedbacks};

    function ar(data){
      if (data != undefined){
        return true
      }
    }

    function todoComplete(data) {
      if (data === 'Completed') {
        return true
      }
    }


    function toggleTodo(todo) {
      console.log(data.feedbacks.data['data'][todo]['status'])
      data.feedbacks.data['data'][todo]['status'] = 'Completed'
    }

  return (
    
    <div>
      <h1>Todo List</h1>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" value={newTodo} onChange={(e) => setNewTodo(e.target.value)}/>
      <Button onClick={handleUpdate}>Add</Button>
      {
        ar(data.feedbacks.data) ?
          <ul style={{color:'black'}}>
              {data.feedbacks.data['data'].map((_, todo) => (
                <li key={todo}>
                  <span style={{
                textDecoration: todoComplete(data.feedbacks.data['data'][todo]['status']) ? 'line-through' : 'none',
                cursor: 'pointer',
              }}  onClick={() => toggleTodo(todo)}> {data.feedbacks.data['data'][todo]['title']} </span>
                </li>
              ))}
          </ul>
      : null
        }
      </div>
  );
};

export default TodoList;