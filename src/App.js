import { useSelector } from 'react-redux';

import { Route, Routes} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUserName, changeFullName } from './store/session-slice';
import { isLogout } from './store/status-slice';
import Layout from './layout/Layout';
import Welcome from './containers/Welcome';
import Login from './containers/Login';
import NotFound from './containers/NotFound';



const App = () => {

 const isLoggedIn = useSelector(state => state.status.isLogin);
 console.log(isLoggedIn);
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const onLogin =()=>{
  navigate('/login');
}

const onLogout =()=>{
  dispatch(changeUserName(null));
  dispatch(changeFullName(null));
  dispatch(isLogout());
}

  return (
    <Layout 
    isLoggedIn={isLoggedIn}
    onLogin={onLogin}
    onLogout={onLogout}>
      <main>
        <Routes>
          {/* { isLogin && (<Route path="/" element={<Welcome />} />)} */}
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
