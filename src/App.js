// import { useSelector } from 'react-redux';
import { Route, Routes} from 'react-router-dom';
import Layout from './layout/Layout';
import Welcome from './containers/Welcome';
import Login from './containers/Login';
import NotFound from './containers/NotFound';

const App = () => {
  // const isLogin = useSelector(state => state.status.isLogin);
  return (
    <Layout>
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
