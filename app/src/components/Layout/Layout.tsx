import { Typography, makeStyles, AppBar, Toolbar, IconButton } from '@material-ui/core';
import React, { FC } from 'react';
import { observer } from 'mobx-react';
import Sidebar from './Sidebar';
import MenuIcon from '@material-ui/icons/Menu';
import { DRAWER_WIDTH } from '#/constants';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${DRAWER_WIDTH}px)`,
      marginLeft: DRAWER_WIDTH,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  header: {
    display: 'flex',
  },
  title: {
    marginLeft: 0,
    marginRight: 'auto',
  },
  links: {
    marginLeft: 'auto',
    marginRight: '0px',
    '& > button': {
      margin: theme.spacing(1),
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    maxWidth: '100%',
    overflowX: 'hidden',
  },
  toolbar: theme.mixins.toolbar,
}));

const Layout: FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const styles = useStyles();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div className={styles.root}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={styles.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My App
          </Typography>
        </Toolbar>
      </AppBar>
      <header className={styles.header}>
        <div className={styles.links}></div>
      </header>
      <Sidebar handleDrawerToggle={handleDrawerToggle} mobileOpen={mobileOpen} />
      <main className={styles.content}>
        <div className={styles.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default observer(Layout);
