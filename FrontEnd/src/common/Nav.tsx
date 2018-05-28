import * as React from 'react';
import { withStyles, StyleRulesCallback } from '@material-ui/core/styles';
import { compose, withState } from 'recompose';
import { IconButton, AppBar, Toolbar, Typography, Menu, MenuItem, Avatar } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import { inject } from 'mobx-react';
import { Store } from 'models/Store';

const styles: StyleRulesCallback = (theme: any) => ({
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
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
            <Avatar
              alt="Adelle Charles"
              src={store.userStore.currentUser.image}
            />
          </div>
          <div>
            <IconButton
              aria-owns={openMenu ? 'menu-appbar' : undefined}
              aria-haspopup="true"
              onClick={(e) => setOpenMenu(!openMenu)}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openMenu}
              onClose={() => setOpenMenu(!openMenu)}
            >
              <MenuItem >Profile</MenuItem>
              <MenuItem >Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
const enhance = compose<NavInternalProps, NavExternalProps>(
  inject('store'),
  withState('openMenu', 'setOpenMenu', false),
  withStyles(styles)
);

export const Nav = enhance(NavComponent);
