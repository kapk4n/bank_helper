// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css"
import LogedNav from './shares/nav_loged.jsx'
// import NotLogedNav from './shares/nav_not_loged.jsx'
import CompanyContent from './pages/limit_module/company';
import BookingLimitPage from './pages/limit_module/booking_limit_page';




import { BrowserRouter as Router, Routes, Route }
from 'react-router-dom';
import Home from './pages/limit_module/home_page'

import {observer} from 'mobx-react-lite'
import 'bootstrap/dist/css/bootstrap.min.css';
import * as React from 'react';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import SavingsIcon from '@mui/icons-material/Savings';
import Profile from './pages/profile_page';
import NotLogedNav from './shares/nav_not_loged';
import MainHomePage from "./pages/home/home_page";
import TestHomePage from "./pages/employe_self_check/home_page";
import AdminPage from "./pages/admin_page/home_page";
import TodoList from "./pages/todo_list/todo_lst";
import SelectAllTransferList from "./pages/todo_list/todo_try";
import { CreateTestPage } from "./pages/employe_self_check/create_test";
import StandardImageList from "./pages/employe_self_check/show_test_results";
import PassTest from "./pages/employe_self_check/pass_test";
import TodoListQQ from "./pages/todo_list/todo";
import DesksList from "./pages/dashboard/desks_list";
import DesksId from "./pages/dashboard/desk_id";
import LibraryInfoPage from "./pages/library/info_page";
import SectionContentPage from "./pages/library/section_content";
import ArticleContentPage from "./pages/library/article_content";
import WordTry from "./pages/library/word_try";
import ArticleViewer from "./pages/library/word_show";
import EmployeeList from "./pages/employes_list/employes_list";
import EmployeeProfile from "./pages/employes_list/employee_profile";

const actions = [
  { icon: <SavingsIcon />, name: 'Скачать данные об утилизации' },
  { icon: <SaveIcon />, name: 'Скачать решение' },
];


export const setAuthToken = token => {
  if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  else
      delete axios.defaults.headers.common["Authorization"];
}
const loged = () => {
  
  if (sessionStorage.getItem('token') != undefined) {
    return true
  }else{
    return false
  }
}

const App = observer(() => {

  return (
    
    <div className='back_ground_table'>
      {loged() ? <LogedNav/> : <NotLogedNav />}
      {/* <LogedNav/>  */}
     {
// sessionStorage.clear()

     }
    {/* <WithHeaderStyledExample/> */}
      {/* <TodoList/> */}
      <Router>
            <Routes>
                <Route path='/' exect element={<MainHomePage />} />
                <Route path='/limit_module/' exect element={<Home />} />
                <Route path='/limit_module/company/:id' element={<CompanyContent />} />
                <Route path='/limit_module/company/bookinglimit/:id' element={<BookingLimitPage />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/employe_tests' element={<TestHomePage />} />
                <Route path='/admin_page' element={<AdminPage />} />
                <Route path='/todo' element={<TodoList />} />
                <Route path='/todo/try' element={<SelectAllTransferList />} />
                <Route path='/test/create/:id' element={<CreateTestPage />} />
                <Route path='/test/show/results/:id/:test_id' element={<StandardImageList />} />
                <Route path='/pass/test/:id/:test_id' element={<PassTest />} />
                <Route path='/todo/try/1' element={<TodoListQQ />} />
                <Route path='/desks' element={<DesksList />} />
                <Route path="/desks/:id" element={<DesksId />} />
                <Route path="/library" element={<LibraryInfoPage />} />
                <Route path="/library/content/:id" element={<SectionContentPage />} />
                <Route path="/library/:sectionid/article/content/:id" element={<ArticleContentPage />} />
                <Route path="/library/try/word/:id" element={<WordTry />} />
                <Route path="/library/try/word/show/:id" element={<ArticleViewer />} />
                <Route path="/employe/list" element={<EmployeeList />} />
                <Route path="/employee/profile/:id" element={<EmployeeProfile />} />
                
            </Routes>
        </Router>

    {/* <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 10, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipOpen
            sx={{paddingBottom:'20px'}}
            // tooltipPlacement = 'top-end'
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial> */}
    </div>
  )
});

export default App
