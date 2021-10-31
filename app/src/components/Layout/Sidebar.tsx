import React, { FC, useCallback } from 'react';
import {
  useTheme,
  Divider,
  List,
  ListItemIcon,
  Hidden,
  Drawer,
  ListItemText,
  ListItem,
  SwipeableDrawer,
  styled,
  Toolbar,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { DRAWER_WIDTH } from '#/constants';
import { useUserStore } from '#/store/useStores';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react';
import { makeStyles } from '@mui/styles';

const StyledDrawer = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: DRAWER_WIDTH,
    flexShrink: 0,
  },
}));

const useStyles = makeStyles(() => ({
  drawerPaper: {
    width: DRAWER_WIDTH,
  },
}));

interface Props {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

const Sidebar: FC<Props> = ({ mobileOpen, handleDrawerToggle }) => {
  const theme = useTheme();
  const history = useHistory();
  const styles = useStyles();
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
    <>
      <Toolbar />
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
    </>
  );

  return (
    <StyledDrawer aria-label="mailbox folders">
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="js">
        <SwipeableDrawer
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          onOpen={() => handleDrawerToggle()}
          classes={{
            paper: styles.drawerPaper,
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
            paper: styles.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </StyledDrawer>
  );
};

export default observer(Sidebar);
