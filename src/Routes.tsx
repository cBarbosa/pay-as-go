import React, { useContext } from 'react';
import { Switch, Redirect, RouteProps, BrowserRouter as Router, Route  } from 'react-router-dom';

import { AuthProvider, Context } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';

import Login from './pages/Login';
import Home from './pages/Home';
import Users from './pages/Users';

export interface IRoute extends RouteProps{
    isPrivate?: boolean
}

function CustomRoute({ isPrivate, ...rest }:IRoute) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  if(isPrivate === undefined && authenticated) {
    return <Redirect to="/home" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Router>
    <ThemeContextProvider>
     <AuthProvider>
      <Switch>
        <CustomRoute exact={true} path='/' component={ Login } />
        <CustomRoute exact={true} path="/login" component={ Login } />
        <CustomRoute isPrivate exact={true} path="/home" component={ Home } />
        <CustomRoute isPrivate exact={true} path="/users" component={ Users } />
      </Switch>
      </AuthProvider>
      </ThemeContextProvider>
    </Router>
  );
}