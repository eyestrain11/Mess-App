import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Admin_Pages from './admin_home/Pages/Admin_Pages';
import User_Page from './user_home/Pages/User_Page';

function App() {
  return (
    <>
      <Router>
        <Navbar />
          <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/admin/:id' exact component={Admin_Pages} />
          <Route path='/user/:id' exact component={User_Page} />
          <Route path='/services' exact component={User_Page} />
          <Route path='/products' exact component={Admin_Pages} />
          <Route path='/sign-up' component={Login} />
          {/* <Route path='/user/menu' component={UserMenu} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
