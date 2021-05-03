import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from './Auth/LoginPage';
import Dash from './Core/Dash';
import Register from './Auth/RegisterPage'
import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { setUserSession, removeUserSession, getToken } from './Utils/Common';
import {VerifyToken} from './Auth/APICalls';

function App() {
  const [authLoading, setAuthLoading] = useState(true);
 
  useEffect( () => {
    const token = getToken();
    if (!token) {
      return;
    }
 
    const retVal = VerifyToken(token).then((res) =>{
      if(res != false)
      {
        setUserSession(res.token, res.name);
        setAuthLoading(false);
      }
      else
      {
        removeUserSession();
        setAuthLoading(false);
      }
    });
  }, []);
 
  if (authLoading && getToken()) {
    return <div className="content">Checking Authentication...</div>
  }
  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="header">
            <NavLink activeClassName="active" to="/login">Login</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/register">Register</NavLink><small>(Access without token only)</small>
            <NavLink activeClassName="active" to="/dashboard">Dashboard</NavLink><small>(Access with token only)</small>
          </div>
          <div className="content">
            <Switch>
              <PublicRoute path="/login" component={Login} />
              <PublicRoute path="/register" component = {Register} />
              <PrivateRoute path="/dashboard" component={Dash} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
