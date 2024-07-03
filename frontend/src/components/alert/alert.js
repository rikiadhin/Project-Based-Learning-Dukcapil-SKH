import React from 'react'
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const SuccessAlert = ({ status }) => {
     return (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 9999 }}>
               <Alert variant="outlined" severity="success" sx={{ bgcolor: '#D5FFCF', width: '500px', marginTop: '10px' }}>
                    {status}
               </Alert>
          </div>
     )
}
const DangerAlert = ({ status }) => {
     return (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 9999 }}>
               <Alert variant="outlined" severity="error" sx={{ bgcolor: '#FFDACF', width: '500px', marginTop: '10px' }}>
                    {status}
               </Alert>
          </div>
     )
}

const DangerAlertWithButton = ({ status }) => {
     const navigate = useNavigate();

     return (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', display: 'flex', justifyContent: 'center', zIndex: 9999 }}>
               <Alert variant="outlined" severity="error" sx={{ bgcolor: '#FFDACF', width: '500px', marginTop: '10px' }} action={
                    <Button color="inherit" size="small" onClick={() => {
                         sessionStorage.removeItem('email');
                         navigate('/login');
                    }}>
                         OK
                    </Button>
               }>
                    {status}
               </Alert>
          </div>
     )
}


export { SuccessAlert, DangerAlert, DangerAlertWithButton }
