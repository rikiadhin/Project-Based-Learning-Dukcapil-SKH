import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loading } from '../components/loading/loading';

const withAuth = (Component) => {
     return (props) => {
          const navigate = useNavigate();
          const [loading, setLoading] = useState(true)
          const token = localStorage.getItem('token');
          const email = sessionStorage.getItem('email');

          useEffect(() => {
               if (!token || !email) {
                    navigate('/login');
               } else {
                    setLoading(false);
               }
          }, [navigate, token, email]);

          return (
               <>
                    {loading ? (
                         <Loading />
                    ) : (
                         <Component {...props} />
                    )}
               </>
          );;
     };
};

export default withAuth;