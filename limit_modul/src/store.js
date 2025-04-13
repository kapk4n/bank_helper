import axios from 'axios'
import {observable, action, makeObservable, autorun, computed} from 'mobx'



class TodoStore {
  tasks = []
  
  desks = []
  ext_desk = []
  // token = ''

  desks_3 = fetch(`http://localhost:8002/api/dashboard/lists/`, {
    method: "GET",
    headers: {
      "origin": "http://localhost:8002/",
      "access-control-allow-origin":"http://localhost:8002/",
      "Authorization":`Bearer ${sessionStorage.getItem("token")}`,
    },
  })
  .then(res => res.json())
  .then(data => {
    this.ext_desk.push(data);
   })
  .then(() => {
    // console.log(...JSON.parse(JSON.stringify(this.ext_desk['0'])).data);

    this.desks.push(...JSON.parse(JSON.stringify(this.ext_desk['0'])).data)
   });


  constructor () {
    makeObservable(this, {
      // token:observable,
      tasks:observable,
      desks:observable,
      setTasks:action,
      // setToken:action,
      setDesks:action,
      addTask:action,
      addDesk:action
    })
    // this.select()
    
  }

  // select() {
  //   var desks_3 = []

  // }

  setTasks (tasks) {
    this.tasks = tasks
  }

  setDesks (desks) {
    this.desks = desks
    // console.log(typeof(desks)[0])
    // console.log(desks[0])
    // console.log(this.desks)
  }
  // setToken (token) {
  //   this.token = token
  //   this.select
  //   // console.log(typeof(desks)[0])
  //   // console.log(desks[0])
  //   console.log(this.token)
  // }


  // addToken = (token) => this.setToken([...this.token, token]);
  addTask = (taskName) => this.setTasks([...this.tasks, taskName]);
  addDesk = (deskName) => this.setDesks([...this.desks, deskName]);

}

export const store = new TodoStore();
