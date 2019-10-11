import React from 'react';
import './App.css';
import logo from './logo.svg';
import { UsersService } from './users/services/UsersService';

const App: React.FC = () => {
  const getStuff = (url: string) => () => {
    const thing = new UsersService();

    thing.getAll().subscribe(response => console.log(response), error => console.log(error));
  };
  return (
    <div className="App" onClick={getStuff('/users')}>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
