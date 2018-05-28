import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';
import { Home } from 'pages/Home';
import { GuestRoute, AuthRoute } from 'common/Route';

const App = () => (
  <Router>
    <div>
      <CssBaseline />
      <Switch>
      <GuestRoute exact={true}  path="/" component={Login} />
      <AuthRoute exact={true}    path="/home" component={Home} />
      </Switch>
    </div>
  </Router>
);

export default App;
