import React from 'react';
import Button from '@mui/material/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br/>
        <Button variant="contained">Hello World</Button>
        <h1 className="text-3xl font-bold underline bg-red-500">      
      Hello world!
    </h1>
      </header>
    </div>
  );
}

export default App;
