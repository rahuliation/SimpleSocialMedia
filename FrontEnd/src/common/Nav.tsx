import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose, withState } from 'recompose';
import { IconButton, AppBar, Toolbar, Typography, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { inject, observer } from 'mobx-react';
import { Store } from 'models/Store';
import { Apis } from 'Apis';

const styles: StyleRulesCallback = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: '5px',
    marginRight: '40px',
  },
});
interface NavExternalProps {

}

interface NavInternalProps extends NavExternalProps {
  classes: any;
  openMenu: boolean;
  setOpenMenu: (openMenu: boolean) => void;
  store: typeof Store.Type;
}

const NavComponent = ({
  store,
  classes,
  openMenu,
  setOpenMenu,
}: NavInternalProps) => (
    <div>

      <AppBar position="static">
        <Toolbar>
          <div className={classes.flex}>

            <Typography variant="title" color="inherit">
              Simple Social
            </Typography>

          </div>
          <div>
          {store.userStore.currentUser.name}

            <IconButton
              aria-owns={openMenu ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              className={classes.menuButton}
              onClick={(e) => setOpenMenu(!openMenu)}
              color="inherit"
            >
              {store.userStore.currentUser.image ?
                <Avatar
                  alt={store.userStore.currentUser.name}
                  src={`${Apis.BASE_URL}${store.userStore.currentUser.image}`}
                />
                :
                <AccountCircle /> 
              }
            </IconButton>
           
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
const enhance = compose<NavInternalProps, NavExternalProps>(
  inject('store'),
  withState('openMenu', 'setOpenMenu', false),
  withStyles(styles),
  observer
);

export const Nav = enhance(NavComponent);
