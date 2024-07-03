import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import { Loading } from "../../components/loading/loading";
import { SuccessAlert, DangerAlert } from '../../components/alert/alert';
import '../../assets/css/login.css';
import backgroundImg from '../../assets/images/baground.png'; 
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment'; 
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';

function ResetPassword() {

  const [password, setPassword] = useState("");
  const [confirmationPassword, setConfirmationPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmationPassword, setShowConfirmationPassword] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    document.title = 'Reset Password';
  }, []);

  const handlePassword = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (!value) {
      setError("Password tidak boleh kosong !");
      return;
    } else {
      setError("");
    }
  };

  const handleConfirmationPassord = (e) => {
    const value = e.target.value;
    setConfirmationPassword(value);
    if (!value) {
      setError("Konfirmasi password tidak boleh kosong !");
      return;
    } else {
      setError("");
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    // Check if password and confirmation password are not empty
    if (!password || !confirmationPassword) {
      setError("Password tidak boleh kosong !");
      return;
    }
    // Check if password and confirmation password match
    if (password !== confirmationPassword) {
      setError("Password tidak sama !");
      return;
    }
    // Check if password meets the complexity requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password harus mengandung huruf besar, huruf kecil, angka, karakter khusus, dan minimal 8 karakter !"
      );
      return;
    }
    setLoading(true);
    try {
      const data = {
        newPassword: password,
        token: token
      }
      await axios.patch(`${apiUrl}/user-reset-password`, data)
        .then((response) => {
          setLoading(false);
          setSuccess(response.data.message);
          setTimeout(() => {
            setSuccess('');
            navigate("/login");
          }, 3000);
        }).catch((error) => {
          setLoading(false);
          setErrorAlert(error.response.data.message);
          setTimeout(() => {
            setErrorAlert('');
          }, 3000);
        });
    } catch (error) {
      setLoading(false);
      setErrorAlert(error.response.data.message);
      setTimeout(() => {
        setErrorAlert('');
      }, 3000);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleShowConfirmationPassword = () => {
    setShowConfirmationPassword((prevShowConfirmationPassword) => !prevShowConfirmationPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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

      {errorAlert && <DangerAlert status={errorAlert} />}

      <div className="container">
        <div className="form-box">
          <h1 id="title">Reset Password</h1>
          <form onSubmit={resetPassword}> 
            <div className="input-group">
              <div className="input-container mb-3">
                <FormControl fullWidth sx={{ width: '100%' }} variant="outlined"> 
                  <OutlinedInput
                    size="small"
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={handlePassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end" 
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="New Password"
                  />
                </FormControl> 
              </div>
              <div className="input-container"> 
                <FormControl fullWidth sx={{ width: '100%' }} variant="outlined"> 
                  <OutlinedInput
                  size="small"
                    id="outlined-adornment-password"
                    type={showConfirmationPassword ? 'text' : 'password'}
                    value={confirmationPassword}
                    onChange={handleConfirmationPassord}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={toggleShowConfirmationPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showConfirmationPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Confirmation Password"
                  />
                </FormControl> 
              </div>
            </div>
            <br />
            {error && (
              <p className="is-danger help">
                {error}
              </p>
            )}
            <div className="btn-field">
              <button type="submit" id="Reset">
                Reset Password
              </button>
            </div>
            <br />
            <Link to={`/`} className="ml-2">
              Kembali
            </Link>
          </form>
        </div>
      </div>
    </section>

  );
}

export default ResetPassword;