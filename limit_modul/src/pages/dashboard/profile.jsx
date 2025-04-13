import '../../App.css'
import React, {useState, useEffect} from 'react';

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import CardProfile from './profile_page'
// import { store } from '../store';


const DesksId = observer(() => {

  // taskStore.showTasks(desk_id)
  // console.log(store.token)
  const desk_id = 2
  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks([]);
      // const url = 'https://url.abc.com/';
      const api_response = axios.get(`http://localhost:8002/api/dashboard/profile/`, {
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()
          // setInterval(fetchArticles(), 2000)
    }, [])

    const data = {feedbacks};

    // console.log(data['feedbacks'].data)
    // console.log(data)

  // console.log(JSON.stringify(taskStore.tasksFromDesk))
  // if (data.feedbacks.data != undefined){
  //   console.log(data['feedbacks'].data)
  // }
    function ar(data){
      if (data != undefined){
        // console.log(data)
        // let data2 = data
        return true
      }
    }

  return (
    
    <div>
    {/* {Array(taskStore.tasksFromDesk.length).fill(true).map((_, i) => <CardTask key={i} {...taskStore.tasksFromDesk[i]}/>)}  */}
    {/* {ar(data.feedbacks.data) ? data['feedbacks'].data['login'] : undefined}  */}
    {ar(data.feedbacks.data) ? Array(data.feedbacks.data['data'].length).fill(true).map((_, i) => <CardProfile key={i} {...data.feedbacks.data['data'][i]}/>) : undefined}
      {/* {store.tasksFromDesk} */}
      {/* {console.log( sessionStorage.getItem('token') )} */}

    </div>
  )
});

export default DesksId
