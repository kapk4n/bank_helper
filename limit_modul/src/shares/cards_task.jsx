import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import OffCanvasExample from '../pages/dashboard/task_page';
import { BsFillTrash3Fill } from "react-icons/bs";
import axios from 'axios';
import {useParams} from "react-router-dom";
import { useState } from 'react';
import React, {useEffect} from 'react';
import { BiSolidChevronsUp } from "react-icons/bi";
import { BiSolidChevronUp } from "react-icons/bi";
import { BiSolidChevronDown } from "react-icons/bi";
import { BiMenu } from "react-icons/bi";


function CardTask(title) {
  let { id } = useParams();

  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks([]);
      // const url = 'https://url.abc.com/';
      const api_response = axios.get(`http://localhost:8001/api/profile/`, {
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()
          // setInterval(fetchArticles(), 2000)
    }, [])
    const data = {feedbacks};





    const [feedbacks2, setFeedbacks2] = useState([]);
    useEffect(() => {
  
      const fetchArticles = async () => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
  
        setFeedbacks2([]);
        // const url = 'https://url.abc.com/';
        const api_response = axios.get(`http://localhost:8001/api/room/${title['desk_id']}`, {
        });
        let data = await api_response;
          setFeedbacks2(data);
      }
      fetchArticles()
            // setInterval(fetchArticles(), 2000)
      }, [])
      const data2 = {feedbacks2};
      // console.log(data2)



  const deleteTask = async (e) => {
  
    // console.log(title)
  
    e.preventDefault();
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;
    try {
      const response = await axios.delete(`http://localhost:8001/api/tasks/delete/${title['task_id']}`);
      location.reload()
    } catch (error) {
      // Handle login error
      console.error(error);
    }
  };


  function ar(data){
    if (data != undefined & data != null){
      if (data.data != undefined) {
        return true
      }
    }
  }

  function is_my_task(data, title, data2){
    if (data['user_id'] == title['author_id'] || data['user_id'] == data2['manager_id']) {
      return true
    }
    else {
      return false
    }    
  }

  function done(data){
    if (data == 'Done') {
      return true
    }
    else {
      return false
    }    
  }

  function icon(data) {
    if (data == 'Medium') {
      return <div>{title['priority']} <BiMenu color='orange' size='20'/></div> 
    }
    if (data == 'Low') {
      return <div>{title['priority']} <BiSolidChevronDown color='blue' size='20'/></div> 
    }
    if (data == 'High') {
      return <div>{title['priority']} <BiSolidChevronUp color='red' size='20'/></div> 
    }
    if (data == 'Very high') {
      return <div>{title['priority']} <BiSolidChevronsUp color='maroon' size='20'/></div> 
    }
  }

  return (
    <Card>
      {/* <Card.Header as="h5">{title['title']}</Card.Header> */}
      <Card.Body>
        { done(title['status']) ? <Card.Title style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}} >{title['title']}</Card.Title> : <Card.Title>{title['title']}</Card.Title> }
        
        {/* {console.log(title['title'])} */}
        <Card.Text>
          {icon(title['priority'])}
        </Card.Text>
        {/* <Button variant="primary" href={`task/${title['task_id']}`}>Go somewhere</Button> */}
        <OffCanvasExample  task={title} placement={'end'}/>
        {ar(data.feedbacks.data) ? ( ar(data2.feedbacks2.data) ? (is_my_task(data.feedbacks.data['data'][0], title, data2.feedbacks2.data['data'][0]) ? <form onSubmit={deleteTask}><Button variant="danger" type="submit"> <BsFillTrash3Fill /> </Button></form> : ''): ''): ''}
        
        {/* {ar(data2.feedbacks2.data) ? console.log(data2.feedbacks2.data['data']) : '' } */}
      </Card.Body>
      <Card.Footer>{title['description']}</Card.Footer>
    </Card>
  );
}

export default CardTask;