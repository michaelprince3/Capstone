import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
// import ProjectCard from './project/ProjectCard';

function App() {
  const cantEdit = () => {
    alert("You can't edit this!!!")
  }

  const cantDelete = () => {
    alert("You can't delete this!!!")
  }
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>
          CapStone
        </h1>
        <div className="buttonBox">
        <button className="button" onClick={cantEdit}>
          Edit
        </button>
        <button className="button" onClick={cantDelete}>
          Delete
        </button>
        </div>
      </header>
    </div>
  );
}

export default App;
