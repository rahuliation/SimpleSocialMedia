import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { compose } from 'recompose';
import { inject } from 'mobx-react';
import { Store } from 'models/Store';

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

const HomeComponent = ({ classes, store , loginTab, setLoginTab }: HomePageInternalProps) => (
  <Grid container={true} className={classes.root}>
    <Grid item={true} md={12} >
        Home
    </Grid>
  </Grid>
);
const enhance = compose<HomePageInternalProps, {}>(
  inject('store'),
  withStyles(styles)

);

export const Home = enhance(HomeComponent);
