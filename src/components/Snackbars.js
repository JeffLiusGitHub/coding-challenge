import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { isClose } from '../store/status-slice';
import { useSelector, useDispatch } from 'react-redux';
const Snackbars = props => {
  const dispatch = useDispatch();
  const open = useSelector(state => state.status.isOpen);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(isClose());
  };
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <MuiAlert severity={props.severity} sx={{ width: '100%' }}>
        {props.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Snackbars;
