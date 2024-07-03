import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
     return (
          <div className="rows mt-5 is-centered">
               <div className='columns is-half is-centered'>
                    <div className='mr-5 mb-5'>
                         <Link to={`admin`} className='button is-success'>Halaman Admin</Link>
                    </div>
               </div>
               <div className='columns is-half is-centered'>
                    <div className='mr-5 mb-5'>
                         <Link to={`dashboard`} className='button is-success'>Dashboard</Link>
                    </div>
               </div>
               <div className='columns is-centered'>
                    <div className='mr-5 mb-5'>
                         <Link to={`formulir`} className='button is-success'>Formulir</Link>
                    </div>
                    <div className='mr-5'>
                         <Link to={`login`} className='button is-success'>Login</Link>
                    </div>
               </div>
               <div className='columns is-centered'>
                    <div className='mr-5'>
                         <Link to={`lupa-password`} className='button is-success'>Lupa Password</Link>
                    </div>
                    <div className='mr-5'>
                         <Link to={`reset-password`} className='button is-success'>Reset Password</Link>
                    </div>
                    <div className='mr-5'>
                         <Link to={`person/:id`} className='button is-success'>Detail</Link>
                    </div>
                    <div className='mr-5'>
                         <Link to={`search`} className='button is-success'>Search</Link>
                    </div>
               </div>
          </div>

     )
}

export default Home

