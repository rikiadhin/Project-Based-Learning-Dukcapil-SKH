import '../../assets/css/login.css';
import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import backgroundImg from '../../assets/images/baground.png'; // Import gambar dengan ES6
import { Loading } from "../../components/loading/loading";
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL_AUTH;

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    setError("");
  };
  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    setError("");
  };
  const handleCheckbox = (e) => {
    const value = e.target.checked;
    setCheckbox(value); 
  };

  const saveUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      email: email,
      password: password,
      checkbox: checkbox
    };

    try {
      await axios
        .post(`${apiUrl}/auth/user/login`, data)
        .then((response) => {
          if (response) {
            setLoading(false);
            localStorage.setItem("token", response.data.token);
            sessionStorage.setItem('email', email);
            navigate("/dashboard");
          }
        })
        .catch((e) => {
          setLoading(false);
          setError(e.response.data.message);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
      setError(error);
    }
  };

  return (
    <div className="App">
      {loading && <Loading />}
      {!loading && (
        <section
          className="section"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="container">
            <div className="form-box">
              <h1 id="title">Selamat Datang </h1>
              <form onSubmit={saveUser}>
                <div className="input-group mb-2">
                  <div className="input-container mb-3">
                    <FormControl fullWidth sx={{
                      width: '100%'
                    }} >
                      <OutlinedInput
                        size="small"
                        id="outlined-adornment-password"
                        type="email"
                        value={email}
                        onChange={handleEmail}
                        placeholder="Email"
                        startAdornment={
                          <InputAdornment position="start">
                            <EmailIcon />
                          </InputAdornment>
                        }

                      />
                    </FormControl>
                  </div>
                  <div className="input-container">
                    <FormControl fullWidth sx={{
                      width: '100%'
                    }} >
                      <OutlinedInput
                        size="small"
                        id="outlined-adornment-password"
                        type="password"
                        value={password}
                        onChange={handlePassword}
                        placeholder="Password"
                        startAdornment={
                          <InputAdornment position="start">
                            <LockIcon />
                          </InputAdornment>
                        }

                      />
                    </FormControl>
                  </div>
                </div>
                {error && (
                  <div className="help is-danger is-centered m-2">
                    {error}
                  </div>
                )}
                <div className="checkbox-container is-justify-content-center is-flex">
                  <span className='mr-3'>
                    <input
                      type="checkbox"
                      name="checkbox"
                      id="agreeCheckbox"
                      value={checkbox}
                      onChange={handleCheckbox}
                    />
                  </span>
                  <span>
                    <label htmlFor="agreeCheckbox">I agree to the platform</label>
                  </span>
                </div>
                <div className="btn-field">
                  <button type="submit" id="Login">Login</button>
                </div>
                <p>Lupa password ? <Link to="/lupa-password">Click Here !</Link></p>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Login;
