import React, {lazy} from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import StatusBar from "../../components/admin/StatusBar"; 
import TabelPelaporan from "../../components/tabel/tabelPelaporan";
import withAuth from '../../utils/AuthLogin'
import "../../styles/BoxContent.css"

const Dashboard = () => { 
  return (
    <section
      class="section"
      style={{
        backgroundImage: `url(${require("../../assets/images/baground.png")})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        Height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="columns">
        <div class="column is-2 mt-3 ml-3">
          <Sidebar />
        </div>
        <div class="column is-10 mt-3 mr-3">
          <Header nama="Dashboard" />
          <div className="section is-main-section" id="SectionContent">
            <StatusBar />
            <div className="box" id="BoxContent">
              <TabelPelaporan />
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default withAuth(Dashboard);
