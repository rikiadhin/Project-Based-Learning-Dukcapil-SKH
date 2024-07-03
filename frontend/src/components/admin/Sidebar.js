import React, {useState} from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom' 
import AlertDialogSlide from '../alert/logoutAlert' 
import '../../styles/Sidebar.css'
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// import HomeIcon from '@mui/icons-material/Home';
// import DatasetIcon from '@mui/icons-material/Dataset';
// import AnalyticsIcon from '@mui/icons-material/Analytics';

const Sidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('email');
    navigate('/login');
  }

  return (
    <div class="box sidebar has-background-white" id="Sidebar">
      {open && (<AlertDialogSlide onOpen={open} onClose={handleClose} onAction={handleLogout} />)}
      <aside class="menu">
        <ul class="menu-list">
          <li>
            <img
              src={require("../../assets/Logo.png")}
              title="Logo"
              alt="Logo"
              id='Logo'
              className='logo'
            />
          </li>
          <br></br>
          <p class="subtitle is-5 has-background-light-20 has-text-dark mt-4">
            DUKCAPIL SUKOHARJO
          </p>
          <li>
            <NavLink id="Tombol" to={`/dashboard`} className={location.pathname === '/dashboard' ? 'button active-link' : 'button'} >Dashboard</NavLink>
          </li>
          <li>
            <NavLink id="Tombol" to={`/dashboard/master-data`} className={location.pathname === '/dashboard/master-data' ? 'button active-link' : 'button'} > Master Data</NavLink>
          </li>
          <li>
            <NavLink id="Tombol" to={`/dashboard/statistik`} className={location.pathname === '/dashboard/statistik' ? 'button active-link' : 'button'} >Statistik</NavLink>
          </li>
          <li>
            <NavLink id="Tombol" to={`/dashboard/profile`} className={location.pathname === '/dashboard/profile' ? 'button active-link' : 'button'} >Profile</NavLink>
          </li>
          <li>
            <button id="TombolOut" onClick={handleClickOpen}>Logout</button>
          </li>
        </ul>
      </aside>
    </div>
  )
}

export default Sidebar