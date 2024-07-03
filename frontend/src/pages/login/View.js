import ViewPerson from "./ViewPerson";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import "../../styles/BoxContent.css"

const DashboardViewPerson = () => {
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
          <Sidebar/>
          </div>
          <div class="column is-10 mt-3 mr-3">
          <Header nama="Profil"/>
          <div className="section is-main-section" id="SectionContent">
          <div className="box" id="BoxContent">
          <ViewPerson/>
          </div>
          </div>
          
          </div>
          </div>
      
      </section>
    );
  };
  
  export default DashboardViewPerson;
  