import { useState, useCallback } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useDispatch } from 'react-redux';
import { changeUserName, changeFullName } from '../store/session-slice';
import { useNavigate } from 'react-router-dom';
import { isOpen } from '../store/status-slice';
import { isLogin } from '../store/status-slice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setpasswordInput] = useState('');
  const [userNameIsInValid, setUserNameIsInValid] = useState(false);
  const [passwordIsInValid, setPasswordIsInValid] = useState(false);

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
        dispatch(changeUserName(username));
        dispatch(changeFullName(fullname));
        dispatch(isLogin());
        dispatch(isOpen());
        navigate('/');
      } else {
        dispatch(isOpen());
      }
    } catch (error) {
      alert(error.message);
      dispatch(isOpen());
    }
  }, [userNameInput, passwordInput, dispatch, navigate]);

  const submitHandler = event => {
    event.preventDefault();
    setUserNameIsInValid(false);
    setPasswordIsInValid(false);
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

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Please log in below
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              value={userNameInput}
              onChange={userNameInputEvent}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            {userNameIsInValid && (
              <Typography component="h8" variant="h6" color="red">
                username cannot be empty
              </Typography>
            )}
            <TextField
              data-testid="password"
              value={passwordInput}
              onChange={passwordInputEvent}
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="password"
              
            />
            {passwordIsInValid && (
              <Typography component="h8" variant="h6" color="red">
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
              </Button>
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
    </>
  );
};
export default Login;
