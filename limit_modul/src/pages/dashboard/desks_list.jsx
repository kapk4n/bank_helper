import '../../App.css'
import WithHeaderStyledExample from '../../shares/cards_desk.jsx'
import React from 'react';
import { store } from '../../store';
import { Button, Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import Box from '@mui/material/Box';
import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import CreatingDesk from './desk_creating'

const DesksList = observer(() => {
  const desks = store.desks


  return (
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
            <CreatingDesk style={{justifyContent: 'center', alignItems: 'center' }} className='cardHeader'/>
          </Typography>
          <Typography component={'span'} style={{ fontSize: 14, display: 'flex', paddingRight: '25px', flexDirection: 'column' }}>
              {Array(desks.length).fill(true).map((_, i) => <WithHeaderStyledExample key={i} {...desks[i]}/>)} 
          </Typography>
        </CardContent>
      </Card>
    </div>

    // <div style={{ display: 'flex', maxWidth: 1200, width: 1200, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', paddingTop: '30px' }}>
    //   <CreatingDesk style={{justifyContent: 'center', alignItems: 'center' }} className='cardHeader'/>
    //       {Array(desks.length).fill(true).map((_, i) => <WithHeaderStyledExample key={i} {...desks[i]}/>)} 
    //   {/* {store.desks} */}
    // </div>
  )
});

export default DesksList
