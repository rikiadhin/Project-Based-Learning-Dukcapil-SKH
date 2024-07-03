import React, { useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import "../../styles/BoxContent.css"
import TableHubungan from "../../components/tabel/tabelHubungan";
import TableKerentanan from "../../components/tabel/tabelKerentanan";
import TableKebutuhanKhusus from "../../components/tabel/tabelKebutuhanKhusus";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import withAuth from '../../utils/AuthLogin'


const TabelMasterData = () => {
     return (
          <div className="app">
               <div className="tile is-ancestor">
                    <div className="tile is-parent">
                         <div className="card tile is-child">
                              <header className="card-header">
                                   <p className="card-header-title">
                                        <span className="icon mr-2">
                                             <FeedOutlinedIcon />
                                        </span>
                                        Data Hubungan
                                   </p>
                              </header>
                              <div className="card-content">
                                   <TableHubungan />
                              </div>
                         </div>
                    </div>
                    <div className="tile is-parent mt-3">
                         <div className="card tile is-child">
                              <header className="card-header">
                                   <p className="card-header-title">
                                        <span className="icon mr-2">
                                             <FeedOutlinedIcon />
                                        </span>
                                        Data Kerentanan
                                   </p>
                              </header>
                              <div className="card-content">
                                   <TableKerentanan />
                              </div>
                         </div>
                    </div>
               </div>
               <div className="card mt-3">
                    <header className="card-header">
                         <p className="card-header-title">
                              <span className="icon mr-2">
                                   <FeedOutlinedIcon />
                              </span>
                              Data Kebutuhan Khusus
                         </p>
                    </header>
                    <div className="card-content">
                         {/* <Example dataPetugas={dataPetugasPerekaman} /> */}
                         {<TableKebutuhanKhusus /> ? <TableKebutuhanKhusus /> : 'Loading...'}
                    </div>
               </div>
          </div>
     )
}

const MasterData = () => {
     useEffect(() => {
          document.title = 'Admin | Master Data';
     }, []);
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
                         <Header nama="Master Data" />
                         <div className="section is-main-section" id="SectionContent">
                              <div className="box" id="BoxContent">
                                   {/* MASTER DATA */}
                                   <TabelMasterData />
                              </div>
                         </div>
                    </div>
               </div>

          </section>
     )
}


export default withAuth(MasterData);