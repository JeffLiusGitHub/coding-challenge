import { Fragment } from 'react';

import AppToolbar from '../components/AppToolbar';


const Layout = props => {
    // console.log(props.isLoggedIn)
  return (
    <Fragment>
      <AppToolbar   
          isLoggedIn={props.isLoggedIn}
          onLogin={props.onLogin}
          onLogout={props.onLogout}  
      />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
