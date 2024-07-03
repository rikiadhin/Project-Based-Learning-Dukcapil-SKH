import React, { useState, useMemo } from "react";
import "bulma/css/bulma.min.css";
import {
  mdiAccountCircle,
  mdiLock,
  mdiAccountMultiple,
  mdiUpload,
  mdiQrcodeScan,
  mdiPlusCircle,
  mdiPencilOutline,
  mdiDelete,
} from "@mdi/js";
import { MaterialReactTable } from "material-react-table";
import Icon from "@mdi/react";

const Profile = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [qrCode, setQrCode] = useState(null);
  const [status, setStatus] = useState("Status message here");
  const [avatar, setAvatar] = useState(null);
  const [createUserModalOpen, setCreateUserModalOpen] = useState(false);
  const [editUserModalOpen, setEditUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({ id: "", name: "", whatsapp: "" });
  const [editUser, setEditUser] = useState({ id: "", name: "", whatsapp: "" });
  const [dataPetugasPerekaman, setDataPetugasPerekaman] = useState([
    { id: 1, name: "Petugas 1", whatsapp: "0812********" },
    { id: 2, name: "Petugas 2", whatsapp: "0812********" },
    { id: 3, name: "Petugas 3", whatsapp: "0812********" },
    { id: 4, name: "Petugas 4", whatsapp: "0812********" },
    { id: 5, name: "Petugas 5", whatsapp: "0812********" },
    { id: 6, name: "Petugas 6", whatsapp: "0812********" },
  ]);

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const handleCreateUserModalToggle = () => {
    setCreateUserModalOpen(!createUserModalOpen);
  };

  const handleEditUserModalToggle = () => {
    setEditUserModalOpen(!editUserModalOpen);
  };

  const handleHapusSession = () => {
    console.log("Session deleted");
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatar(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleEditUserChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  const handleCreateUser = (e) => {
    e.preventDefault();
    console.log("New user created", newUser);
    setDataPetugasPerekaman([...dataPetugasPerekaman, newUser]);
    setNewUser({ id: "", name: "", whatsapp: "" });
    setCreateUserModalOpen(false);
  };

  const handleEditUser = (e) => {
    e.preventDefault();
    console.log("User edited", editUser);
    setDataPetugasPerekaman(
      dataPetugasPerekaman.map((user) =>
        user.id === editUser.id ? editUser : user
      )
    );
    setEditUser({ id: "", name: "", whatsapp: "" });
    setEditUserModalOpen(false);
  };

  const handleDeleteUser = (id) => {
    setDataPetugasPerekaman(dataPetugasPerekaman.filter((user) => user.id !== id));
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "whatsapp",
        header: "Nomor Whatsapp",
      },
      {
        accessorKey: "actions",
        header: "Actions",
        Cell: ({ row }) => (
          <div>
            <button
              className="button is-small"
              onClick={() => {
                setEditUser(row.original);
                setEditUserModalOpen(true);
              }}
              style={{ marginRight: "8px", backgroundColor: "#00d1b2", color: "white" }}
            >
              <Icon path={mdiPencilOutline} size={1} />
            </button>
            <button
              className="button is-small"
              onClick={() => handleDeleteUser(row.original.id)}
              style={{ backgroundColor: "#ff3860", color: "white" }}
            >
              <Icon path={mdiDelete} size={1} />
            </button>
          </div>
        ),
      },
    ],
    [dataPetugasPerekaman]
  );

  return (
    <section className="section is-main-section">
      <style>
        {`
          .custom-border {
            border: 3px solid #811D29;
            border-radius: 20px;
            padding: 20px;
          }
        `}
      </style>
      <div className="columns">
        <div className="column is-half">
          <div className="card custom-border">
            <header className="card-header">
              <p className="card-header-title">
                <span className="icon">
                  <Icon path={mdiAccountCircle} size={1} />
                </span>
                Edit Profile
              </p>
            </header>
            <div className="card-content">
              <form>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Avatar</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="field file">
                        <label className="upload control">
                          <input
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleAvatarChange}
                          />
                          {avatar && (
                            <img
                              src={avatar}
                              alt="Avatar"
                              style={{
                                maxWidth: "300px",
                                maxHeight: "300px",
                                marginBottom: "10px",
                              }}
                            />
                          )}
                          <span
                            className="button is-primary"
                            style={{ backgroundColor: "#811D29", color: "white" }}
                          >
                            <span className="icon">
                              <Icon path={mdiUpload} size={1} />
                            </span>
                            <span>Pick a file</span>
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <hr />
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
                          defaultValue="example user name"
                          name="name"
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
                          defaultValue="user@example.com"
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
                    <div className="field is-expanded">
                      <div className="control">
                        <input
                          autoComplete="on"
                          className="input"
                          defaultValue="user@example.com"
                          name="nomorWA"
                          required
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="control">
                      <button
                        type="button"
                        className="button"
                        onClick={handleModalToggle}
                        data-ripple-light="true"
                      >
                        <span className="icon">
                          <Icon path={mdiQrcodeScan} size={1} color="#25D366" />
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="field is-horizontal">
                  <div className="field-label is-normal" />
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <button
                          className="button"
                          type="submit"
                          style={{ backgroundColor: "#811D29", color: "white" }}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {modalOpen && (
                  <div className="modal is-active">
                    <div className="modal-background"></div>
                    <div className="modal-card">
                      <header className="modal-card-head">
                        <h4 className="modal-card-title">WhatsApp API QR</h4>
                        <button
                          aria-label="close"
                          className="delete"
                          onClick={handleModalToggle}
                        ></button>
                      </header>
                      <section className="modal-card-body is-justified-and-centred">
                        <div className="form">
                          <h3 className="title is-center">{status}</h3>
                          <div id="qrcode-container" className="qrcode">
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
                            <div className="body">
                              <ul>
                                <li>
                                  Scan kode QR berikut dengan aplikasi WhatsApp
                                  Anda seperti WhatsApp Web.
                                </li>
                                <li>
                                  Sesi WhatsApp Web yang aktif akan digantikan
                                  dengan sesi dari server ini.
                                </li>
                                <li>
                                  <b>Gunakan dengan bijak.</b>
                                </li>
                              </ul>
                              <button
                                className="button is-danger"
                                onClick={handleHapusSession}
                                style={{
                                  backgroundColor: "#811D29",
                                  color: "white",
                                }}
                              >
                                Hapus Session
                              </button>
                            </div>
                          </div>
                        </div>
                      </section>
                      <footer className="modal-card-foot">
                        <div className="buttons">
                          <button
                            className="button level-right"
                            onClick={handleModalToggle}
                            style={{
                              backgroundColor: "#ffffff",
                              color: "#000000",
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </footer>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="column is-half">
          <div className="card custom-border">
            <header className="card-header">
              <p className="card-header-title">
                <span className="icon">
                  <Icon path={mdiLock} size={1} />
                </span>
                Change Password
              </p>
            </header>
            <div className="card-content">
              <form>
                <div className="field is-horizontal">
                  <div className="field-label is-normal">
                    <label className="label">Current password</label>
                  </div>
                  <div className="field-body">
                    <div className="field">
                      <div className="control">
                        <input
                          autoComplete="current-password"
                          className="input"
                          name="password_current"
                          required
                          type="password"
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
                          autoComplete="new-password"
                          className="input"
                          name="password"
                          required
                          type="password"
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
                          autoComplete="new-password"
                          className="input"
                          name="password_confirmation"
                          required
                          type="password"
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
                          className="button"
                          type="submit"
                          style={{ backgroundColor: "#811D29", color: "white" }}
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
      <div className="card custom-border">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon">
              <Icon path={mdiAccountMultiple} size={1} />
            </span>
            Daftar petugas perekaman
          </p>
          <button
            className="button is-primary"
            onClick={handleCreateUserModalToggle}
            style={{
              marginLeft: "1px",
              backgroundColor: "#811D29",
              color: "white",
            }}
          >
            <span className="icon">
              <Icon path={mdiPlusCircle} size={1} />
            </span>
            <span>Create New User</span>
          </button>
        </header>
        <div className="card-content">
          <MaterialReactTable columns={columns} data={dataPetugasPerekaman} />
        </div>
      </div>
      {createUserModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <h5 className="modal-card-title">Create New User</h5>
              <button
                aria-label="close"
                className="delete"
                onClick={handleCreateUserModalToggle}
              ></button>
            </header>
            <section className="modal-card-body">
              <form onSubmit={handleCreateUser}>
                <div className="field">
                  <label className="label">ID</label>
                  <div className="control">
                    <input
                      className="input"
                      name="id"
                      value={newUser.id}
                      onChange={handleNewUserChange}
                      type="text"
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nama Petugas</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      value={newUser.name}
                      onChange={handleNewUserChange}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nomor WhatsApp</label>
                  <div className="control">
                    <input
                      className="input"
                      name="whatsapp"
                      value={newUser.whatsapp}
                      onChange={handleNewUserChange}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      className="button is-primary"
                      type="submit"
                      style={{ backgroundColor: "#811D29", color: "white" }}
                    >
                      Create
                    </button>
                  </div>
                </div>
              </form>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button"
                onClick={handleCreateUserModalToggle}
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
      {editUserModalOpen && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <h5 className="modal-card-title">Edit User</h5>
              <button
                aria-label="close"
                className="delete"
                onClick={handleEditUserModalToggle}
              ></button>
            </header>
            <section className="modal-card-body">
              <form onSubmit={handleEditUser}>
                <div className="field">
                  <label className="label">ID</label>
                  <div className="control">
                    <input
                      className="input"
                      name="id"
                      value={editUser.id}
                      onChange={handleEditUserChange}
                      type="text"
                      disabled
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nama Petugas</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      value={editUser.name}
                      onChange={handleEditUserChange}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Nomor WhatsApp</label>
                  <div className="control">
                    <input
                      className="input"
                      name="whatsapp"
                      value={editUser.whatsapp}
                      onChange={handleEditUserChange}
                      type="text"
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <div className="control">
                    <button
                      className="button is-primary"
                      type="submit"
                      style={{ backgroundColor: "#811D29", color: "white" }}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </section>
            <footer className="modal-card-foot">
              <button
                className="button"
                onClick={handleEditUserModalToggle}
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              >
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
};

export default Profile;
