import CssBaseline from '@material-ui/core/CssBaseline';
import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Login } from './pages/Login';

const App = () => (
  <Router>
    <div>
      <CssBaseline />
      <Route exact={true} path="/" component={Login} />

    </div>
  </Router>
);

export default App;
