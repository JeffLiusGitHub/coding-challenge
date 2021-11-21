import { useSelector } from 'react-redux';

const Welcome = () => {
  const userName = useSelector(state => state.session.username);

  return <>{userName && <h1>welcome {userName}!</h1>}</>;
};
export default Welcome;
