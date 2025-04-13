import React, { Component } from "react";
import axios from "axios";
import { useState } from "react";
// import { store } from '../store';

import { observer } from 'mobx-react-lite';

export const TodoList = observer(() => {
  const [currentInputValue, setCurrentInputValue] = useState('');
  const [currentInputValue2, setCurrentInputValue2] = useState('');


  return (
    <div>
      
      {/* {
        store.tasks.map((task, i) => <div key={i}>{task}</div>)
      }
      <input value={currentInputValue} onChange={(e) => setCurrentInputValue(e.target.value)}/>
      <button onClick={()=>store.addTask(currentInputValue)}>Добавить</button> */}

      </div>
  )

{/* здесь инпут */}
      {/* <div>
      {
       store.tasks.map((task, i) => <div key={i}>{task}</div>)
      }
      <input value={currentInputValue2} onChange={(e) => setCurrentInputValue2(e.target.value)}/>
      <button onClick={()=>store.addDesk(currentInputValue2)}>Добавить</button>

      <div>
        {console.log(JSON.parse(JSON.stringify(store.desks)))}

      </div>

      </div> */}

});

export default TodoList;
