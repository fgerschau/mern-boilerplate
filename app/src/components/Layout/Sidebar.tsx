import React, { FC, useCallback } from 'react';
import {
  makeStyles,
  useTheme,
  Divider,
  List,
  ListItemIcon,
  Hidden,
  Drawer,
  ListItemText,
  ListItem,
  SwipeableDrawer,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { DRAWER_WIDTH } from '#/constants';
import { useUserStore } from '#/store/useStores';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: FC<Props> = ({ mobileOpen, handleDrawerToggle }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const userStore = useUserStore();
  const handleLogout = useCallback(() => {
    userStore.logout();
    history.push('/');
  }, []);

  const openPathAndCloseDrawer = (path: string) => {
    history.push(path);
    handleDrawerToggle();
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      {userStore.isLoggedIn ? (
        <>
          <Divider />
          <List>
            <ListItem
              button
              selected={history.location.pathname.includes('dashboard')}
              onClick={() => openPathAndCloseDrawer('/dashboard')}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>
        </>
      ) : null}
      <Divider />
      <List>
        {userStore.isLoggedIn ? (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItem>
        ) : (
          <ListItem button onClick={() => openPathAndCloseDrawer('/login')}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Log in" />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="js">
        <SwipeableDrawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={() => handleDrawerToggle()}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown implementation="js">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

export default observer(Sidebar);
