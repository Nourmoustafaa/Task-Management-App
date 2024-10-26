 
/* eslint-disable no-unused-vars */
import React from 'react';
import TaskManager from './TaskManager'; 

const App = () => {
  return (
    <div >
      < header className="navbar navbar-dark">
        <a className="navbar-brand" href="#">
        <i className="bi bi-clipboard2 ">Task Management System</i>
        </a>
      </header>
      <TaskManager />
    </div>
  );
};

export default App;
