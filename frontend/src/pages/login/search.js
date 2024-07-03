import '../../assets/css/login.css'; 
import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import backgroundImg from '../../assets/images/baground.png'; // Import gambar dengan ES6

function Search() {
  return (
    <div>
      <section
        className="section"
        style={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container">
          <div className="search-container">
            <div className="search-header">
              <h1>Cari yang Anda Mau</h1>
            </div>
            <div className="search-box">
              {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
              <input type="text" placeholder="Search..." className="search-input" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Search;
