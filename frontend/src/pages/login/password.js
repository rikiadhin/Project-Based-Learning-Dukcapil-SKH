import React, { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../../components/loading/loading";
import { Link } from "react-router-dom";
import { SuccessAlert, DangerAlert } from '../../components/alert/alert';
import '../../assets/css/login.css';
import backgroundImg from '../../assets/images/baground.png'; 
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';

function Password() {

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = 'Lupa Password';
  }, []);

  const kirimLinkLupaPassword = async (event) => {
    event.preventDefault();
    if (!email) {
      setError("Email tidak boleh kosong !");
    } else {
      setLoading(true);
      await axios
        .patch(`${apiUrl}/user/forgot-password`, {
          email: email,
        })
        .then((response) => {
          setLoading(false);
          setSuccess(response.data.message);
          setTimeout(() => {
            setSuccess('');
          }, 3000);
          setEmail("");
        })
        .catch((error) => {
          setLoading(false);
          setError(error.response.data.message);
        });
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    if (error) {
      setError("");
    }
  };

  return (
    <section
      className="section"
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: 'fixed'
      }}
    >
      {loading && <Loading />}

      {success && <SuccessAlert status={success} />}

      <div className="container">
        <div className="form-box">
          <h1 id="title">Lupa Password</h1>
          <form>
            <p>Masukkan email untuk mereset password</p>
            <div className="input-group mt-4">
              <div className="input-container">
                <FormControl fullWidth sx={{
                  width: '100%'
                }} variant="outlined"> 
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-password"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Email"
                    startAdornment={ 
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    }

                  />
                </FormControl>
              </div>
            </div>
            <br />
            {error && <p className="help is-danger">{error} </p>}
            <div className="btn-field">
              <button type="submit" onClick={kirimLinkLupaPassword} id="Send">Send</button>
            </div>
            <br />
            <Link to={`/login`} className="is-danger">
              Kembali
            </Link>
          </form>
        </div>
      </div>
    </section>

  );
}

export default Password;