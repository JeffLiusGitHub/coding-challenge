
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Welcome = () => {
  const userName = useSelector(state => state.session.username);
  const isLogin = useSelector(state => state.status.isLogin);
  const [open, setOpen] = useState(false)
  useEffect(()=>{
      if(isLogin){
          setOpen(true)
      }
  },[])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
}; 
  return <>{userName && <h1>welcome {userName}!</h1>}
    <Snackbar
        anchorOrigin={{
          vertical: 'buttom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <MuiAlert severity="success" sx={{ width: '100%' }}>
          Success!
        </MuiAlert>
      </Snackbar>
   
  </>;
};
export default Welcome;
