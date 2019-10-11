import React, { useContext, useEffect, useState } from 'react';
import { tap } from 'rxjs/operators';
import './App.css';
import logo from './logo.svg';
import { BaseUser } from './users/models/User';
import { UsersServiceContext } from './users/services/UsersServiceContext';

const App: React.FC = () => {
  const [usersData, setUsersData] = useState<BaseUser[]>([]);
  const { usersService } = useContext(UsersServiceContext);

  const usersDataEffect = () => {
    const subscription = usersService
      .getAll()
      .pipe(tap(users => setUsersData(users)))
      .subscribe(response => console.log(response), error => console.log(error));
    return () => subscription.unsubscribe();
  };

  useEffect(usersDataEffect, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {usersData.map(user => {
          return <div key={user.id}>{user.username}</div>;
        })}
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
