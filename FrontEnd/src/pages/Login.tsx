import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { compose, withState } from 'recompose';
import { LoginForm } from '../components/Login/LoginForm';
import { Tabs, Tab } from '@material-ui/core';
import { RegistrationForm } from 'components/Login/Registration';
import { inject, observer } from 'mobx-react';
import { Store } from 'models/Store';
import { Redirect } from 'react-router';

const styles: StyleRulesCallback = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  login: {
    minHeight: '90vh'
  },
  paper: {
    padding: '50px'
  },
});

interface LoginPageInternalProps {
  store: typeof Store.Type;
  message: string;
  setMessage: (message: string) => void;
  classes: any;
  loginTab: number;
  setLoginTab: (loginTab: number) => void;
}

const LoginComponent = ({ classes, store,
  loginTab, setLoginTab,
  message, setMessage }: LoginPageInternalProps) =>
  store.userStore.currentUser.authenticated === true ?
    (
      <Redirect
        to={{
          pathname: '/home',
        }}
      />
    )
    :
    (
      <Grid container={true} className={classes.root}>
        <Grid item={true} md={12} >
          <Grid
            container={true}
            alignItems="center"
            className={classes.login}
            justify="center"
          >
            <Paper style={{ width: '500px' }} className={classes.paper}>
              {message}
              <Tabs
                value={loginTab}
                onChange={(e, val) => setLoginTab(val)}
                fullWidth={true}
                indicatorColor="secondary"
                textColor="secondary"
              >
                <Tab label="LOGIN" />
                <Tab label="REGISTRATION" />
              </Tabs>
              {loginTab === 0 && <LoginForm
                currentUser={store.userStore.currentUser}
                onLogin={() => setLoginTab(0)}
              />}
              {loginTab === 1 && <RegistrationForm
                currentUser={store.userStore.currentUser}
                onSave={() => {
                  setLoginTab(0);
                  setMessage('Successfully Registered');
                }}
              />}
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
const enhance = compose<LoginPageInternalProps, {}>(
  inject('store'),
  observer,
  withState('message', 'setMessage', ''),
  withState('loginTab', 'setLoginTab', 0),
  withStyles(styles),
  observer,
);

export const Login = enhance(LoginComponent);
