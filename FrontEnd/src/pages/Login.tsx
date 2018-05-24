import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { compose, withState } from 'recompose';
import { LoginForm } from '../components/Login/LoginForm';
import { Tabs, Tab } from '@material-ui/core';
import { RegistrationForm } from 'components/Login/Registration';

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

interface PropsWithStyles {
  classes: any;
  loginTab: number;
  setLoginTab: (loginTab: number) => void;
}

const LoginComponent = ({ classes, loginTab, setLoginTab }: PropsWithStyles) => (
  <Grid container={true} className={classes.root}>
    <Grid item={true} md={12} >
      <Grid
        container={true}
        alignItems="center"
        className={classes.login}
        justify="center"
      >
        <Paper style={{width: '500px'}} className={classes.paper}>
          <Tabs
            value={loginTab}
            onChange={(e, val) => setLoginTab(val)}
            fullWidth={true}
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab  label="LOGIN" />
            <Tab  label="REGISTRATION" />
          </Tabs>
          {loginTab === 0 && <LoginForm />}
          {loginTab === 1 && <RegistrationForm />}
        </Paper>
      </Grid>
    </Grid>
  </Grid>
);
const enhance = compose<PropsWithStyles, {}>(
  withState('loginTab', 'setLoginTab', 0),
  withStyles(styles)

);

export const Login = enhance(LoginComponent);
