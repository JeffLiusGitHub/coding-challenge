import { useState, useCallback } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import { changeUserName, changeFullName } from '../store/session-slice';
import { isLogin } from '../store/status-slice';
import { useNavigate } from 'react-router-dom';
import React from 'react';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setpasswordInput] = useState('');
  const [userNameIsInValid, setUserNameIsInValid] = useState(false);
  const [passwordIsInValid, setPasswordIsInValid] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = createTheme();

  const userNameInputEvent = event => {
    setUserNameInput(event.target.value);
  };

  const passwordInputEvent = event => {
    setpasswordInput(event.target.value);
  };

  const fetchHandler = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        body: JSON.stringify({
          username: userNameInput,
          password: passwordInput,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const { username, fullname } = await response.json();

        console.log({ username, fullname });
        dispatch(changeUserName(username));
        dispatch(changeFullName(fullname));
        dispatch(isLogin());
        navigate('/');
      } else {
        setOpen(true);
        console.log(response);
      }
    } catch (error) {
      alert(error.message);
      setOpen(true);
    }
  }, [userNameInput, passwordInput,dispatch,navigate]);

  const submitHandler = event => {
    event.preventDefault();
    setUserNameIsInValid(false);
    setPasswordIsInValid(false);
    console.log(userNameInput);
    console.log(passwordInput);
    if (userNameInput === '') {
      setUserNameIsInValid(true);
    }
    if (passwordInput === '') {
      setPasswordIsInValid(true);
    }
    if (!userNameIsInValid && !passwordIsInValid) {
      fetchHandler();
    }
  };

  const resetHandler = event => {
    event.preventDefault();

    setUserNameInput('');
    setpasswordInput('');
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
}; 

  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert severity="warning" sx={{ width: '100%' }}>
          Error!
        </MuiAlert>
      </Snackbar>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>

            </Avatar>

            <Typography component="h1" variant="h5">
              Please log in below
            </Typography>
            <Box
              component="form"
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                value={userNameInput}
                onChange={userNameInputEvent}
                margin="normal"
                required
                fullWidth
                id="email"
                label="username"
                name="email"
                autoComplete="email"
                autoFocus
              />
              {userNameIsInValid && (
                <Typography component="h8" variant="h8" color="red">
                  username cannot be empty
                </Typography>
              )}

              <TextField
                value={passwordInput}
                onChange={passwordInputEvent}
                margin="normal"
                required
                fullWidth
                name="password"
                label="password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {passwordIsInValid && (
                <Typography component="h8" variant="h8" color="red">
                  password cannot be empty
                </Typography>
              )}

              <Stack spacing={2} direction="row">
                <Button
                  type="button"
                  fullWidth
                  variant="outlined"
                  onClick={resetHandler}
                >
                  Reset
                </Button>{' '}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={submitHandler}
                >
                  Login
                </Button>
              </Stack>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Login;
