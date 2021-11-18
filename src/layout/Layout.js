import { Fragment } from 'react';

import AppToolbar from '../components/AppToolbar';


const Layout = props => {
    
  return (
    <Fragment>
      <AppToolbar     
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
 // isLoggedIn={isLoggedIn}
        // onLogin={handleLogin}
        // onLogout={logout}