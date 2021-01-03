import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import LandingPage from './views/LandingPage';
import Register from './views/Register';
import Inventory from './views/Inventory';
import { UserContext } from './context/UserContext';
import setAuthToken from './utils/setAuthTokenToHeaders';
import { userRequests } from './utils/API/userRequests';

import './App.css';

const App = () => {
  const [userState, setUserState] = useState({
    user: null,
    isAuthenticated: false,
  });

  const { user, isAuthenticated } = userState;

  const loadUser = async () => {
    const response = await userRequests.getUser();
    const { user } = response.data;
    setUserState({
      ...userState,
      user,
      isAuthenticated: true,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      loadUser();
    }
  }, []);

  return (
    <>
      <Router>
        <UserContext.Provider value={{ user, isAuthenticated, setUserState }}>
          <Nav />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/inventory' component={Inventory} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </>
  );
};

export default App;
