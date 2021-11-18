import { useSelector } from 'react-redux';
import { Route, Routes, Navigate, Switch, Redirect } from 'react-router-dom';
import Layout from './layout/Layout';
import Welcome from './containers/Welcome';
import Login from './containers/Login';
import NotFound from './containers/NotFound';
const App = () => {
  // const showCart = useSelector((state) => state.ui.cartIsVisible);

  return (
    <Layout >
      <main>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
    </Layout>
  );
};

export default App;
