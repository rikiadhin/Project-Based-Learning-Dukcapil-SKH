
import React, { useEffect, useState } from 'react';
import backgroundImg from '../../assets/images/bg.jpg';
import axios from 'axios';
import dayjs from "dayjs";
import { Loading } from "../../components/loading/loading";
import { SuccessAlert, DangerAlert } from '../../components/alert/alert';
import '../../styles/search.css'

function Search() {

     const [dataPelaporan, setDataPelaporan] = useState([]);
     const [kodePelaporan, setKodePelaporan] = useState('');
     const [error, setError] = useState(null);
     const [success, setSuccess] = useState(null);
     const [loading, setLoading] = useState(false);
     const [filteredDataPelaporan, setFilteredDataPelaporan] = useState([]);
     const apiUrl = process.env.REACT_APP_API_URL; 

     const funcGetLaporan = async () => {
          const response = await axios.get(`${apiUrl}/pelaporans`);
          const data = response.data;
          setDataPelaporan(data);
     }
     useEffect(() => {
          document.title = 'Searching';
          funcGetLaporan();
     }, []);

     const handleInputKodePelaporan = (event) => {
          setKodePelaporan(event.target.value);
     }
     const handleSearch = () => {
          setLoading(true);
          const getPelaporanById = dataPelaporan.filter(
               (x) => x.kodePelaporan == kodePelaporan
          ).map((laporan) => ({
               kodePelaporan: laporan.kodePelaporan,
               namaPelapor: laporan.Terlapor.Pelapor.namaPelapor,
               nomorWA: laporan.Terlapor.Pelapor.nomorWA,
               tanggalPelaporan: dayjs(laporan.tanggalPelaporan).locale("id").format(
                    "HH:mm:ss - DD MMMM YYYY"
               ),
               statusLayanan: laporan.statusLayanan
          }));
          if (getPelaporanById.length > 0) {
               setFilteredDataPelaporan(getPelaporanById);
               setSuccess('data pelaporan ditemukan');
               setTimeout(() => {
                    setSuccess("");
               }, 3000);
          } else {
               setFilteredDataPelaporan(false);
               setError('data pelaporan tidak ditemukan !');
               setTimeout(() => {
                    setError("");
               }, 3000);
          }
          setLoading(false);
     }

     return (
          <div>
               <section className="hero is-fullheight" style={{
                    backgroundImage: `url(${backgroundImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'repeat',
                    backgroundAttachment: 'fixed'
               }}>
                    <div id='allcontent' className='p-5 is-justify-content-center is-align-items-center'>
                         <img
                              alt=""
                              src={require("../../assets/images/adminduk.png")}
                              className="images"
                         />
                         <div id='search' className='box is-justify-content-center is-align-items-center' >
                              <label className="label">Masukkan kode pelaporan anda disini</label>
                              <div className="field is-grouped is-flex is-align-items-center">
                                   <div className="control is-expanded">
                                        <input
                                             className="input"
                                             type="text"
                                             placeholder="Masukkan kode pelaporan"
                                             name="kodePelaporan"
                                             value={kodePelaporan}
                                             onChange={handleInputKodePelaporan}
                                        />
                                   </div>
                                   <button
                                        onClick={handleSearch}
                                        rel="noopener noreferrer"
                                        className="button is-link has-text-white"
                                   >
                                        Search
                                   </button>
                              </div>
                         </div>

                         {loading && <p>Loading...</p>}
                         {error && <p style={{ color: 'red' }}>{error}</p>}
                         {success && <SuccessAlert status={success} />}

                         {filteredDataPelaporan.length > 0 && (
                              <div id='table' className='box is-justify-content-center is-align-items-center'>
                                   <div className="table-container">
                                        <table className="table w-full">
                                             <thead>
                                                  <tr>
                                                       <th>Kode pelaporan</th>
                                                       <th>Nama pelapor</th>
                                                       <th>Nomor pelapor</th>
                                                       <th>Tanggal pelaporan</th>
                                                       <th>Status Layanan</th>
                                                  </tr>
                                             </thead>
                                             <tbody>
                                                  {filteredDataPelaporan.map((x) => (
                                                       <tr>
                                                            <th>{x.kodePelaporan}</th>
                                                            <td>{x.namaPelapor}</td>
                                                            <td>{x.nomorWA}</td>
                                                            <td>{x.tanggalPelaporan}</td>
                                                            <td>{x.statusLayanan}</td>
                                                       </tr>
                                                  ))}
                                             </tbody>
                                        </table>
                                   </div>
                              </div>
                         )}

                    </div>
               </section>
          </div >
     );
}

export default Search;
