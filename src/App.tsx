import React from 'react';
import CalculatingMachine from './components/CalculatingMachine';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='machine-container'>
        <CalculatingMachine />
      </div>
    </div>
  );
}

export default App;
