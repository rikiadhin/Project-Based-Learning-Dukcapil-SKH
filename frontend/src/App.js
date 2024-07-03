import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/login/login';
import Formulir from './pages/Formulir/Formulir';
import Admin from './pages/login/Admin';
import LupaPassword from './pages/login/password';
import Search from './pages/search/search';
import ResetPassword from './pages/login/resetpassword';
import PersonDetail from './components/PersonDetail';
import 'bulma/css/bulma.min.css';
import Dashboard from './pages/admin/Dashboard';
import DetailPelaporan from './pages/admin/DetailPelaporan';
import EditPelaporan from './pages/admin/EditPelaporan';
import DashboardProfile from './pages/admin/Profil';
import Statistik from './pages/admin/Statistik';
import MasterData from './pages/admin/MasterData';  
 
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* ROUTE FORMULIR */}
          <Route path="/formulir" element={<Formulir />} />

          {/* ROUTES LOGIN */}
          <Route path="/login" element={<Login />} />
          <Route path="/lupa-password" element={<LupaPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* ROUTES ADMIN */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/detail-pelaporan/:id" element={<DetailPelaporan />} />
          <Route path="/dashboard/edit-pelaporan/:id" element={<EditPelaporan />} />
          <Route path="/dashboard/statistik" element={<Statistik />} />
          <Route path="/dashboard/master-data" element={<MasterData />} />
          <Route path="/dashboard/profile" element={<DashboardProfile />} />
          <Route path="/dashboard/person" element={<PersonDetail />} />
 
          <Route path="/search" element={<Search />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
