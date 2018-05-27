import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Home } from 'pages/Home';
import { inject, observer } from 'mobx-react';

export const MyRoute = inject('store')(observer(({
  MyComponent , 
  store, publicComp 
  , ...rest})  => (
  <Route
    {...rest}
    render={props =>
      publicComp === true ? 
      store.userStore.currentUser.authenticated  === false ? (
        <MyComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/home',
            state: { from: props.location }
          }}
        />
      ) 
      :
      store.userStore.currentUser.authenticated === true ? (
        <MyComponent {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/',
            state: { from: props.location }
          }}
        />
      )
    }
  />

)));

const App = () => (
  <Router>
    <div>
      <CssBaseline />
      <Route exact={true} path="/" MyComponent={Login} />
      <Route exact={true}  path="/home" MyComponent={Home} />

    </div>
  </Router>
);

export default App;
