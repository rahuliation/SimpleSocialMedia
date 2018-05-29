import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from 'recompose';
import { inject, observer } from 'mobx-react';
import { Store } from 'models/Store';
import { Nav } from 'common/Nav';
import { UserList } from 'components/Home/UserList';
import { Paper, Typography } from '@material-ui/core';

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

interface HomePageInternalProps {
  store: typeof Store.Type;
  classes: any;
  loginTab: number;
  setLoginTab: (loginTab: number) => void;
}

const HomeComponent = ({ classes, store, loginTab, setLoginTab }: HomePageInternalProps) =>
  (
    <Grid container={true} className={classes.root}>
      <Grid item={true} md={12} xs={12}>
        <Nav />
      </Grid>
      <br/>
      <Grid justify="center" container={true} >
        <Grid item={true} md={8} xs={12}>
          <Paper className={classes.paper} elevation={4}>
            <Typography variant="headline" color="primary" align="center" component="h3">
              List of Users
            </Typography>
            <br/>
            <UserList
              userStore={store.userStore}
            />
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  );
const enhance = compose<HomePageInternalProps, {}>(
  inject('store'),
  withStyles(styles),
  observer
);

export const Home = enhance(HomeComponent);
