import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';
import LandingPage from './views/LandingPage';
import Register from './views/Register';
import './App.css';

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/register' component={Register} />
        </Switch>
      </Router>
    </>
  );
};

export default App;
