import { bool, func } from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { SESSION_ACTIONS } from '../actions/types';

import AppToolbar from '../components/AppToolbar';

function Main({ isLoggedIn, logout, push }) {
  const handleLogin = () => {
    push('/login');
  };

  return (
    <>
      <AppToolbar
        isLoggedIn={isLoggedIn}
        onLogin={handleLogin}
        onLogout={logout}
      />
    </>
  );
}

Main.propTypes = {
  isLoggedIn: bool.isRequired,
  logout: func.isRequired,
  push: func.isRequired,
};

const mapStateToProps = state => {
  return {
    isLoggedIn: !!state.getIn(['session', 'username']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(SESSION_ACTIONS.LOGOUT),
    push: path => dispatch(push(path)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
