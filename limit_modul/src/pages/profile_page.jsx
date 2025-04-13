import { styled } from '@mui/material/styles';
import React, {useState, useEffect} from 'react';

import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardProfile from './profile.jsx';
import { Button } from '@mui/material';


const Profile = (User) => {

  const handleClose2 = () => setOpen2(false);
  const handleOpen2 = () => setOpen2(true);
  const [open2, setOpen2] = React.useState(false);



  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    // theme.palette.grey[200]
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[200],
      ...theme.applyStyles('dark', {
        backgroundColor: theme.palette.grey[800],
      }),
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: '#f56e29',
      ...theme.applyStyles('dark', {
        backgroundColor: '#308fe8',
      }),
    },
  }));







  const [feedbacks, setFeedbacks] = useState([]);
  useEffect(() => {

    const fetchArticles = async () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${sessionStorage.getItem("token")}`;

      setFeedbacks([]);
      const api_response = axios.get(`http://localhost:8001/api/profile/`, {
      });
      let data = await api_response;
        setFeedbacks(data);
    }
    fetchArticles()
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

    function admin_check(data){
      if (data == 1){return true}
      return false
    }



  return (
    <div>
      {ar(data.feedbacks.data) ? 
          admin_check(data.feedbacks.data['data'][0]['role_id']) ? 
            <Button href='/admin_page'>jnrk</Button>
            // console.log(data.feedbacks.data['data'][0]['role_id']) 
          :null
      : null}

          <React.Fragment>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}  style={{ display: 'flex', justifyContent:'center'}}>
                <div style={{ display: 'flex', justifyContent:'center', flexDirection:'column'}}>
                          <CardContent style={{hight:'10px', padding:'5px 10px', maxWidth: 800, width:800}}>
                                <Typography gutterBottom sx={{fontSize: 14,hight:'10px', color:'black'}}>
                                    {ar(data.feedbacks.data) ? Array(data.feedbacks.data['data'].length).fill(true).map((_, i) => 
                                      <CardProfile key={i} {...data.feedbacks.data['data'][i]}/>
                                      ) : undefined}
                                </Typography>
                          </CardContent>
                </div>
                </Box>
          </React.Fragment>
    </div>
    
    
  );
}

export default Profile;