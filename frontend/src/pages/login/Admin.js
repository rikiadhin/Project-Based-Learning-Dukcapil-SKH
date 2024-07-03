import React from "react";
import { useState } from "react";
import "../../styles/Dashboard.css"; // Pastikan path ini benar
import Example from "../../components/ContentDashboard";
import Profile from "../../components/ContentProfile";
import PersonDetail from "../../components/PersonDetail";
import Statistik from "../../components/ContentStatistik";

import backgroundImg from '../../assets/images/baground.png'; // Import gambar dengan ES6
import Statistik1 from "../../components/ContentStatistik2";

const Admin = () => {
  const [activeContent, setActiveContent] = useState('Dashboard');
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleSidebarClick = (content) => {
    setActiveContent(content);
    setIsButtonClicked(true);
  };

  return (
    <section
      className="section"
      style={{
        minHeight: "100vh", // pastikan elemen ini mengisi seluruh tinggi layar
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex", // gunakan Flexbox untuk tata letak
        flexDirection: "column",
      }}
    >
      <div className="columns" style={{ flex: 1 }}>
        {/* SIDEBAR */}
        <div className="column is-2 mt-3 ml-3">
          <div className="box has-background-white">
            <aside className="menu">
              <ul className="menu-list has-text-centered ">
                <a className="has-background-white-20">
                  <figure className="image is-96x96 ml-5 mt-4">
                    <img
                      src={require("../../assets/Logo.png")}
                      title="Logo"
                      alt="Logo"
                    />
                  </figure>
                </a>
                <br></br>
                <a className="subtitle is-5 has-background-light-20 has-text-dark mt-4">
                  DUKCAPIL SUKOHARJO
                </a>
                <li>
                  <button
                    className={`button ${
                      activeContent === "Dashboard" ? "is-clicked" : ""
                    }`}
                    onClick={() => handleSidebarClick("Dashboard")}
                  >
                    Dashboard
                  </button>
                </li>
                <li>
                  <button
                    className={`button ${
                      activeContent === "Statistik" ? "is-clicked" : ""
                    }`}
                    onClick={() => handleSidebarClick("Statistik")}
                  >
                    Statistik
                  </button>
                </li>
                <li>
                  <button
                    className={`button ${
                      activeContent === "Profil" ? "is-clicked" : ""
                    }`}
                    onClick={() => handleSidebarClick("Profil")}
                  >
                    Profil
                  </button>
                </li>
                <li>
                  <button
                    className={`button ${
                      activeContent === "PersonDetail" ? "is-clicked" : ""
                    }`}
                    onClick={() => handleSidebarClick("PersonDetail")}
                  >
                    Persondetail
                  </button>
                </li>
              </ul>
              <br></br>
              <button className="button-logout is-medium">Logout</button>
            </aside>
          </div>
        </div>

        {/* TITLE & CONTENT */}
        <div className="column is-10 mt-3 mr-3">
          <div className="box has-background-white">
            {activeContent === "Dashboard" && (
              <h1 className="title is-4 has-text-dark">Dashboard</h1>
            )}
            {activeContent === "Statistik" && (
              <h1 className="title is-4 has-text-dark">Statistik</h1>
            )}
            {activeContent === "Profil" && (
              <h1 className="title is-4 has-text-dark">Profil</h1>
            )}
            {activeContent === "PersonDetail" && (
              <h1 className="title is-4 has-text-dark">PersonDetail</h1>
            )}
          </div>

          {activeContent === "Dashboard" && (
            <div className="columns">
              <div className="column is-4 ml-2">
                <div className="box stats">
                  <div className="labels">
                    JUMLAH AJUAN : <br />
                  </div>
                  <div className="value">16</div>
                </div>
              </div>
              <div className="column is-2">
                <div className="box stats ajuan">
                  <div className="labels">
                    DIAJUKAN <br />
                  </div>
                  <div className="value">0</div>
                </div>
              </div>
              <div className="column is-2">
                <div className="box stats ajuan">
                  <div className="labels">
                    SELESAI <br />
                  </div>
                  <div className="value">0</div>
                </div>
              </div>
              <div className="column is-2">
                <div className="box stats ajuan">
                  <div className="labels">
                    DIVERIFIKASI <br />
                  </div>
                  <div className="value">0</div>
                </div>
              </div>
              <div className="column is-2">
                <div className="box stats ajuan">
                  <div className="labels">
                    DITOLAK <br />
                  </div>
                  <div className="value">0</div>
                </div>
              </div>
            </div>
          )}

          {/* BOX CONTENT */}
          <div className="box-content">
            <div className="content mt-5">
              {activeContent === "Dashboard" && <Example />}
              {activeContent === "Statistik" && <Statistik />}
              {activeContent === "Profil" && <Profile />}
              {activeContent === "PersonDetail" && <PersonDetail />}
              {activeContent === "Dashboard" && <div>{<Example />}</div>}
              {activeContent === "DataTerlapor" && (
                <div>Konten Data Terlapor</div>
              )}
              {activeContent === "Profil" && <div>{<Profile />}</div>}
              {activeContent === "PersonDetail" && <div>{<PersonDetail />}</div>}
            {activeContent === 'Dashboard' && <div>{<Example/>}</div>}
          {activeContent === 'DataTerlapor' && <div>Konten Data Terlapor</div>}
          {activeContent === 'Statistik' && <div>
            <div className="columns">
              <div className="column has-background-link">{<Statistik/>}</div>
              <div className="column has-background-danger">{<Statistik1/>}</div>
            </div>
            </div>}
          {activeContent === 'Profil' && <div>Konten Profil</div>}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Admin;
