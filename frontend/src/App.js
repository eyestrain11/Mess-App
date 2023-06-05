import React, { Fragment } from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import User from './user_home/User';
import Login from './components/pages/Login';
import Menu from './menu/Menu';
import UserMenu from './menu/UserMenu';
import Adduser from "./User/Adduser";
import Alluser from "./User/Alluser";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Menu} />
          <Route path='/products' component={User}>
          </Route>
          <Route path='/sign-up' component={Login} />
          <Route path='/admin/menu' component={Menu} />
          <Route path='/user/menu' component={UserMenu} />
          <Route path='/adduser' component={Adduser} />
          <Route path='/alluser' component={Alluser} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
