import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/pages/Login';
import Admin_Pages from './admin_home/Pages/Admin_Pages';
import User_Page from './user_home/Pages/User_Page';
import useAuth from './Auth/useAuth';
import useRefresh from './Auth/useRefresh';

function App() {
  const { auth } = useAuth();
  const refresh = useRefresh();
  const [refreshing , isRefreshing] = useState(true);
  
  useEffect(() => {
    isRefreshing(true);
    const verifyCookie = async () => {
        try {
            await refresh();
        } catch (error) {
            auth.role = -1;
        } finally {
            isRefreshing(false);
        }
    }
    auth.role ? isRefreshing(false) : verifyCookie();
  }, []);


  return (
    <>
    {refreshing ?
    (<p>Loading . . . </p>)
    :
    (
    <>
    <BrowserRouter>
      <Navbar />
        <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/user/:id' exact>
          {auth.role===0 ? <User_Page/> : <Redirect to="/"/>} 
        </Route>
        <Route path='/admin/:id' exact>
          {auth.role===1 ? <Admin_Pages/> : <Redirect to="/"/>}
        </Route>
        <Route path='/services' exact component={User_Page} />
        <Route path='/products' exact component={Admin_Pages} />
        <Route path='/sign-up' component={Login} />
      </Switch>
    </BrowserRouter>
    </>
    )}
    </>
  );
};

export default App;
