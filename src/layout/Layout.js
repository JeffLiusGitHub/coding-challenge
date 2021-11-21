import AppToolbar from '../components/AppToolbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
const theme = createTheme();
const Layout = props => {
  return (
    <>
      <AppToolbar
        isLoggedIn={props.isLoggedIn}
        onLogin={props.onLogin}
        onLogout={props.onLogout}
      />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <main>{props.children}</main>
      </ThemeProvider>
    </>
  );
};

export default Layout;
