import { useRef, useState } from 'react';
import { bool, func } from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUserName, changeFullName } from '../store/session-slice';
import { isLogin, isLogout } from '../store/status-slice';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1
  }
}));

function AppToolbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.status.isLogin);
  const userIconRef = useRef(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const classes = useStyles();

  const handleClickUserMenu = () => {
    setUserMenuOpen(true);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(false);
  };

const onLogin =()=>{
  navigate('/login');
}

const onLogout =()=>{
  dispatch(changeUserName(null));
  dispatch(changeFullName(null));
  dispatch(isLogout());
}
  return (
    <AppBar position='static'>
      <Toolbar>
        <img
          alt='intelligence bank logo'
          src='/ib-logo.png'
          style={{ width: 48,
            //  height: 48,
              paddingRight: 12 }}
        />
        <Typography variant='h6' className={classes.title}>
          Intelligence Bank Coding Exercise
        </Typography>
        {isLoggedIn ? (
          <>
            <IconButton
              aria-label='user icon'
              aria-controls='user-menu'
              aria-haspopup='true'
              color='inherit'
              onClick={handleClickUserMenu}
              innerRef={userIconRef}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              anchorEl={userIconRef.current}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              aria-label='user menu'
              getContentAnchorEl={null}
              id='user-menu'
              onClose={handleCloseUserMenu}
              open={userMenuOpen}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <MenuItem aria-label='logout' onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : <Button color='inherit' aria-label='login' onClick={onLogin}>Login</Button>}
      </Toolbar>
    </AppBar>
  );
}

AppToolbar.propTypes = {
  isLoggedIn: bool.isRequired,
  onLogout: func.isRequired,
  onLogin: func.isRequired
};

export default AppToolbar;
