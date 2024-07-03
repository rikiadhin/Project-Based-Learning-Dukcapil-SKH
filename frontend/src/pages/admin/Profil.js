import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import ExampleWithProviders from "../../components/tabel/tabelPetugasPerekaman";
import { SuccessAlert, DangerAlert } from '../../components/alert/alert'; 
import {Loading} from "../../components/loading/loading";
import io from "socket.io-client";
import axios from "axios"; 
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import withAuth from '../../utils/AuthLogin'
import DeleteIcon from '@mui/icons-material/Delete';
import "../../styles/BoxContent.css"

const DashboardProfile = () => {
  return (
    <section
      class="section"
      style={{
        backgroundImage: `url(${require("../../assets/images/baground.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="columns">
        <div class="column is-2 mt-3 ml-3">
          <Sidebar />
        </div>
        <div class="column is-10 mt-3 mr-3">
          <Header nama="Profil" />
          <div className="section is-main-section" id="SectionContent">
            <div className="box" id="BoxContent">
              {/* DATA PROFILE */}
              <DataProfile />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

const DataProfile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [status, setStatus] = useState("");
  const [dataAdmin, setDataAdmin] = useState({
    nama: "",
    email: "",
    nomorWA: "",
  });
  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');  
  const email = sessionStorage.getItem('email'); 
  const token = localStorage.getItem('token');
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = process.env.REACT_APP_API_URL_AUTH;

  const getDataAdmin = async () => {
    const response = await axios.get(
      `${apiUrl}/userByEmail/${email}`
    );
    const data = response?.data;
    setDataAdmin({
      nama: data?.nama,
      email: data?.email,
      nomorWA: data?.nomorWA,
    });
    setLoading(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDataAdmin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.patch(
        `${apiUrl}/user/${email}`,
        dataAdmin, {
        headers: {
          'token': token
        }
      }
      );
      setLoading(false);
      setSuccess(response.data.msg);
      sessionStorage.setItem('email', dataAdmin.email);
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.msg);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  }
  const handleChangePassword = (e) => {
    const { name, value } = e.target;
    setChangePassword((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const handleSubmitChangePassword = async (e) => {
    e.preventDefault();
    if (!changePassword.currentPassword || !changePassword.newPassword || !changePassword.confirmPassword) {
      setError("Password tidak boleh kosong !");
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    // Check if password and confirmation password match
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      setError("Password tidak sama !");
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    // Check if password meets the complexity requirements
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(changePassword.newPassword)) {
      setError(
        "Password harus mengandung huruf besar, huruf kecil, angka, karakter khusus, dan minimal 8 karakter !"
      );
      setTimeout(() => {
        setError('');
      }, 3000);
      return;
    }
    setLoading(true);
    try {
      await axios.patch(
        `${apiUrl}/user/change-password/${email}`,
        changePassword, {
        headers: {
          'token': token
        }
      }
      ).then((response) => {
        setLoading(false);
        setChangePassword({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setSuccess(response.data.msg);
        setTimeout(() => {
          setSuccess('');
        }, 3000);
      }).catch((error) => {
        setLoading(false);
        setError(error.response.data.msg);
        setTimeout(() => {
          setError('');
        }, 3000);
      })
    } catch (error) {
      setLoading(false);
      setError("Password gagal diupdate !");
      setTimeout(() => {
        setError('');
      }, 3000);
    }

  }

  useEffect(() => {
    document.title = 'Admin | Profile';
    getDataAdmin();
    const socket = io(`${url}`);

    socket.on("connect", () => {
      console.log('Connected to socket.io server');
    });

    socket.on("qr", (src) => {
      setQrCode(src);
    });

    socket.on("qrstatus", (src) => {
      setQrCode(src);
    });

    socket.on("log", (log) => {
      setStatus(log);
    });

    socket.on("disconnect", () => {
      console.log('Disconnected from socket.io server');
    });

    return () => {
      socket.disconnect();
    };

  }, []);

  const handleHapusSession = async () => {
    try {
      const response = await fetch(`${url}/hapus-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();
      console.log(data);
      alert("Session berhasil dihapus !");
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat menghapus session.");
    }
  };
  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="app">
      <div className="tile is-ancestor mb-3">
        <div className="tile is-parent mb-3">
          <div className="card tile is-child">
            <header className="card-header">
              <p className="card-header-title">
                <span className="icon mr-2">
                  <FeedOutlinedIcon />
                </span>
                Edit Profile
              </p>
            </header>
            <div className="card-content">
              <form onSubmit={handleSubmitProfile}>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Name</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          autoComplete="on"
                          className="input"
                          value={dataAdmin.nama}
                          onChange={handleInputChange}
                          name="nama"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">E-mail</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          autoComplete="on"
                          className="input"
                          value={dataAdmin.email}
                          onChange={handleInputChange}
                          name="email"
                          required
                          type="email"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Nomor WA</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          autoComplete="on"
                          className="input"
                          value={dataAdmin.nomorWA}
                          onChange={handleInputChange}
                          name="nomorWA"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                    <span className="icon has-text-primary is-large pb-2">
                      <button
                        type="button"
                        className="btn rounded-lg"
                        onClick={handleModalToggle}
                        data-ripple-light="true"
                      >
                        <WhatsAppIcon/>
                      </button>
                    </span>
                  </div>
                </div>
                <hr />
                <div className="field is-horizontal">
                  <div className="field-label is-normal" />
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <button
                          className="button is-link has-text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="tile is-parent">
          <div className="card tile is-child">
            <header className="card-header">
              <p className="card-header-title">
                <span className="icon mr-2">
                  <FeedOutlinedIcon />
                </span>
                Change Password
              </p>
            </header>
            <div className="card-content">
              <form onSubmit={handleSubmitChangePassword}>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Current password</label>
                  </div>
                  <div className="field-body ">
                    <div className="field is-half">
                      <div className="control">
                        <input
                          autoComplete="currentPassword"
                          className="input"
                          name="currentPassword"
                          value={changePassword.currentPassword}
                          onChange={handleChangePassword}
                          type="password"
                          placeholder="Current Password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">New password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          autoComplete="newPassword"
                          className="input"
                          name="newPassword"
                          value={changePassword.newPassword}
                          onChange={handleChangePassword}
                          type="password"
                          placeholder="New Password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Confirm password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          autoComplete="confirmPassword"
                          className="input"
                          name="confirmPassword"
                          value={changePassword.confirmPassword}
                          onChange={handleChangePassword}
                          type="password"
                          placeholder="Confirm Password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="field is-horizontal">
                  <div className="field-label is-normal" />
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <button
                          className="button is-link has-text-white"
                          type="submit"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon mr-2">
              <FeedOutlinedIcon />
            </span>
            <span>
              Daftar petugas perekaman
            </span> 
          </p>
        </header>
        <div className="card-content">
          <ExampleWithProviders />
        </div>
      </div> */}

      {loading && <Loading/>}

      {success && <SuccessAlert status={success} />}

      {error && <DangerAlert status={error} />}

      {/* Modal */}
      {modalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card is-flex is-justify-content-center">
            <header className="modal-card-head has-text-centered">
              <h4 className="modal-card-title is-centered">
                WhatsApp API QR
              </h4>
              <button
                aria-label="close"
                className="delete"
                onClick={handleModalToggle}
              ></button>
            </header>
            <section className="modal-card-body has-text-centered">
              <div className="form has-text-centered">
                <h3 className="title is-centered">
                  {status}
                </h3>
                <div
                  id="qrcode-container"
                  className="qrcode"
                >
                  {qrCode && (
                    <img
                      src={qrCode}
                      alt="QR Code"
                      style={{ width: "250px" }}
                    />
                  )}
                </div>
                <div className="card">
                  <div className="title">Panduan</div>
                  <div className="body has-text-centered">
                    <ul>
                      <li>
                        1. Klik tombol hapus session, untuk menampilkan qrcode baru
                      </li> 
                      <li>
                        2. Scan qrcode pada layar, seperti scan pada whatsapp web
                      </li> 
                      <li>
                        3. Tunggu proses scan lalu cek perangkat telephone anda
                      </li> 
                      <li>
                        4. Jika status sudah aktif, maka koneksi sudah berhasil.
                      </li> 
                      <li>
                        <b>Gunakan dengan bijak.</b>
                      </li>
                    </ul>
                    <div className="is-flex is-justify-content-center mt-4">
                      <button
                        className="button is-danger"
                        onClick={handleHapusSession}
                      >
                        <span className="icon is-small">
                          <DeleteIcon />
                        </span>
                        <span>Hapus Session</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-end">
              <div className="buttons has-text-centered">
                <button
                  className="button level-right is-centered has-text-black"
                  onClick={handleModalToggle}
                >
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </div>
  )
}

export default withAuth(DashboardProfile);
