import React, { useContext, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import { UsersServiceContext } from './users/services/UsersServiceContext';

const App: React.FC = () => {
  const { usersService } = useContext(UsersServiceContext);

  const usersDataEffect = () => {
    const subscription = usersService
      .getAll()
      .subscribe(response => console.log(response), error => console.log(error));
    return () => subscription.unsubscribe();
  };

  useEffect(usersDataEffect, []);

  return (
    <div className="App">
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
