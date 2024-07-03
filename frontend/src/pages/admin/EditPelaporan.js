import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import { decryptId } from "../../utils/Enskripsi";
import axios from "axios";
import dayjs from "dayjs";
import RequiredLabel from "../../components/requiredLabel";
import { SuccessAlert, DangerAlert } from '../../components/alert/alert';
import { Loading } from '../../components/loading/loading'
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined'; 
import DoneAllIcon from '@mui/icons-material/DoneAll';
import withAuth from '../../utils/AuthLogin'
import "../../styles/BoxContent.css"
import "../../styles/Detail.css"

const FormEditPelaporan = () => {
     const [dataPelaporanById, setDataPelaporanById] = useState({
          id: "",
          namaPelapor: "",
          nomorNIK: "",
          nomorWA: "",
          hubunganId: "",
          statusHubungan: "",

          namaTerlapor: "",
          jenisKelaminId: "",
          alamat: "",
          kelurahanId: "",
          kecamatanId: "",
          namaKelurahan: "",
          namaKecamatan: "",
          tempatLahir: "",
          tanggalLahir: "",
          namaIbuKandung: "",
          namaAyahKandung: "",
          kerentanan: "",
          kebutuhanKhusus: "",

          kodePelaporan: "",
          tanggalPelaporan: "",
          statusLayanan: "",
     }); 
     const [formFile, setFormFile] = useState({
          scanKK: "",
          scanKTP: "",
          scanIjazah: "",
          scanAkta: "",
          scanDokumenLain: "",
          fotoWajah: "",
     }); 
     const { id } = useParams();
     const decryptedId = decryptId(id); 
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);
     const [success, setSuccess] = useState('');
     const [errorModal, setErrorModal] = useState(null);
     const [hubunganList, setHubunganList] = useState([]);
     const [jenisKelaminList, setJenisKelaminList] = useState([]);
     const [kecamatanList, setKecamatanList] = useState([]);
     const [kelurahanList, setKelurahanList] = useState([]); 
     const apiUrl = process.env.REACT_APP_API_URL;
     const token = localStorage.getItem('token');
     
     const fetchData = async () => {
          try {
               // Mengambil data dengan Promise.all
               const [
                    pelaporanResponse,
                    hubungansResponse,
                    kecamatansResponse,
                    kelurahansResponse,
                    jenisKelaminResponse
               ] = await Promise.all([
                    axios.get(`${apiUrl}/terlapor/${decryptedId}`, {
                         headers: {
                              'token': token
                         }
                    }),
                    axios.get(`${apiUrl}/hubungans`),
                    axios.get(`${apiUrl}/kecamatans`),
                    axios.get(`${apiUrl}/kelurahans`),
                    axios.get(`${apiUrl}/jenisKelamins`)
               ]);

               // Mengolah data pelaporan
               const pelaporanData = pelaporanResponse.data;
               setDataPelaporanById({
                    id: pelaporanData.id,
                    namaPelapor: pelaporanData.Pelapor.namaPelapor,
                    nomorNIK: pelaporanData.Pelapor.nomorNIK,
                    nomorWA: pelaporanData.Pelapor.nomorWA,
                    hubunganId: pelaporanData.Pelapor.hubunganId,
                    statusHubungan: pelaporanData.Pelapor.Hubungan.statusHubungan,
                    kelurahanId: pelaporanData.kelurahanId,
                    kecamatanId: pelaporanData.Kelurahan.kecamatanId,
                    namaTerlapor: pelaporanData.namaTerlapor,
                    jenisKelaminId: pelaporanData.JenisKelamin.id,
                    alamat: pelaporanData.alamat,
                    namaKelurahan: pelaporanData.Kelurahan.namaKelurahan,
                    namaKecamatan: pelaporanData.Kelurahan.Kecamatan.namaKecamatan,
                    tempatLahir: pelaporanData.tempatLahir,
                    tanggalLahir: pelaporanData.tanggalLahir,
                    namaIbuKandung: pelaporanData.namaIbuKandung,
                    namaAyahKandung: pelaporanData.namaAyahKandung,
                    kerentanan: pelaporanData.TerlaporRentans.map(
                         (rentan) => rentan.Kerentanan.namaKerentanan
                    ).join(", "),
                    kebutuhanKhusus: pelaporanData.TerlaporKhusus.map(
                         (rentan) => rentan.KebutuhanKhusu.namaKebutuhanKhusus
                    ).join(", "),
                    kodePelaporan: pelaporanData.Pelaporan.kodePelaporan,
                    tanggalPelaporan: dayjs(pelaporanData.Pelaporan.tanggalPelaporan).format(
                         "HH:mm:ss DD-MM-YYYY"
                    ),
                    statusLayanan: pelaporanData.Pelaporan.statusLayanan,
               });

               // Mengatur file form
               setFormFile({
                    scanKK: pelaporanData.scanKK,
                    scanAkta: pelaporanData.scanAkta,
                    scanIjazah: pelaporanData.scanIjazah,
                    scanKTP: pelaporanData.scanKTP,
                    scanDokumenLain: pelaporanData.scanDokumenLain,
                    fotoWajah: pelaporanData.fotoWajah
               });

               // Mengatur list lainnya
               setHubunganList(hubungansResponse.data);
               setKecamatanList(kecamatansResponse.data);
               setKelurahanList(kelurahansResponse.data);
               setJenisKelaminList(jenisKelaminResponse.data);

               // Mengatur loading
               setLoading(false);
          } catch (error) {
               // Mengatur error dan loading
               setError("Failed to fetch data");
               setLoading(false);
          }
     }; 

     useEffect(() => {
          document.title = 'Admin | Edit laporan';
          fetchData(); 
     }, []);

     const updateDataPelaporan = async (e) => {
          e.preventDefault();
          const readyData = new FormData();
          readyData.append("scanKK", formFile.scanKK);
          readyData.append("scanKTP", formFile.scanKTP);
          readyData.append("scanIjazah", formFile.scanIjazah);
          readyData.append("scanAkta", formFile.scanAkta);
          readyData.append("scanDokumenLain", formFile.scanDokumenLain);  
          const dataPelapor = {
               namaPelapor: dataPelaporanById?.namaPelapor,
               nomorWA: dataPelaporanById?.nomorWA,
               hubunganId: dataPelaporanById?.hubunganId,
               nomorNIK: dataPelaporanById?.nomorNIK,
          };

          const dataTerlapor = {
               namaTerlapor: dataPelaporanById?.namaTerlapor,
               jenisKelaminId : dataPelaporanById?.jenisKelaminId,
               namaIbuKandung: dataPelaporanById?.namaIbuKandung,
               kelurahanId: dataPelaporanById?.kelurahanId,
               tempatLahir: dataPelaporanById?.tempatLahir,
               namaAyahKandung: dataPelaporanById?.namaAyahKandung,
               alamat: dataPelaporanById?.alamat,
               tanggalLahir: dataPelaporanById?.tanggalLahir,
               scanKK: readyData.get("scanKK"),
               scanAkta: readyData.get("scanAkta"),
               scanIjazah: readyData.get("scanIjazah"),
               scanKTP: readyData.get("scanKTP"),
               scanDokumenLain: readyData.get("scanDokumenLain"),
          }; 
          console.log('data perekaman :', dataTerlapor)
          setLoading(true);
          try {
               const response = await Promise.all([
                    axios.patch(`${apiUrl}/pelapor/${decryptedId}`, dataPelapor),
                    axios.patch(`${apiUrl}/terlapor/${decryptedId}`, dataTerlapor, {
                         headers: {
                              "Content-type": "multipart/form-data",
                         },
                    }), 
               ]);
               setLoading(false);
               fetchData(); 
               setSuccess('Data berhasil di update');
               setTimeout(() => {
                    setSuccess('');
               }, 3000);
          } catch (error) {
               setLoading(false);
               setError('Data gagal di update');
               setTimeout(() => {
                    setError('');
               }, 3000);
               console.log("Error updating data:", error);
          }
     };

     const handleInputChange = (e) => {
          const { name, value } = e.target;
          setDataPelaporanById((prevState) => ({
               ...prevState,
               [name]: value,
          }));
     };

     const handleInputFile = (e) => {
          const { name } = e.target;
          const file = e.target.files[0];
          setFormFile((prevFormFile) => ({
               ...prevFormFile,
               [name]: file,
          }));
          setError("");
     };
 
     function handlekecamatanId(event) {
          console.log(event.target.value);
          const id = event.target.value;
          setDataPelaporanById((prevState) => ({
               ...prevState,
               kecamatanId: id,
          }));
     } 

     return (
          <div className="card">
               <header className="card-header">
                    <p className="card-header-title">
                         <span className="icon mr-2">
                              <FeedOutlinedIcon />
                         </span>
                         Edit Laporan
                    </p>
               </header>
               <div className="card-content">
                    <form onSubmit={updateDataPelaporan}>
                         <div>
                              <h4>
                                   <b>
                                        <u>DATA PELAPOR</u>
                                   </b>
                              </h4>
                         </div>
                         <div className="columns">
                              <div className="column">
                                   <div className="field">
                                        <label className="label">Nama Pelapor</label>
                                        <div className="control">
                                             <input
                                                  placeholder="Nama Pelapor"
                                                  autoComplete="namaPelapor"
                                                  className="input"
                                                  name="namaPelapor"
                                                  value={dataPelaporanById?.namaPelapor || ""}
                                                  required
                                                  type="text"
                                                  onChange={handleInputChange}
                                             />
                                        </div>
                                        {/* <p className="help">Required. Your current password</p> */}
                                   </div>
                                   <div className="field">
                                        <label className="label">Nomor NIK</label>
                                        <div className="control">
                                             <input
                                                  placeholder="Nomor NIK"
                                                  autoComplete="nomorNIK"
                                                  className="input"
                                                  name="nomorNIK"
                                                  required
                                                  type="text"
                                                  value={dataPelaporanById?.nomorNIK || ""}
                                                  onChange={handleInputChange}
                                             />
                                        </div>
                                        {/* <p className="help">Required. Your current password</p> */}
                                   </div>
                              </div>
                              <div className="column">
                                   <div className="field">
                                        <label className="label">Nomor WhatsApp</label>
                                        <div className="control is-expanded">
                                             <input
                                                  className="input"
                                                  type="text"
                                                  placeholder="Nomor WhatsApp"
                                                  autoComplete="nomorWA"
                                                  name="nomorWA"
                                                  value={dataPelaporanById?.nomorWA || ""}
                                                  onChange={handleInputChange}
                                             />
                                        </div>
                                   </div>
                                   <div className="field">
                                        <label className="label">Hubungan</label>
                                        <div className="control is-expanded">
                                             <div className="select is-fullwidth">
                                                  <select
                                                       name="hubunganId"
                                                       className="select-custom"
                                                       value={dataPelaporanById.hubunganId}
                                                       onChange={handleInputChange}
                                                       defaultValue={
                                                            dataPelaporanById.statusHubungan
                                                       }
                                                  >
                                                       {hubunganList.map((hubungan, index) => (
                                                            <option key={index} value={hubungan.id}>
                                                                 {hubungan.statusHubungan}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="column">
                                   <div className="field">
                                        <RequiredLabel children="Tanggal Pelaporan" />
                                        <div className="control">
                                             <input
                                                  placeholder="Tanggal Pelaporan"
                                                  className="input"
                                                  name="tanggalPelaporan"
                                                  required
                                                  type="text"
                                                  readOnly
                                                  value={
                                                       dataPelaporanById?.tanggalPelaporan || ""
                                                  }
                                             />
                                        </div>
                                   </div>
                                   <div className="field">
                                        <RequiredLabel children="Status Layanan" />
                                        <div className="control">
                                             <input
                                                  placeholder="Status Layanan"
                                                  className="input"
                                                  name="statusLayanan"
                                                  required
                                                  type="text"
                                                  readOnly
                                                  value={dataPelaporanById?.statusLayanan || ""}
                                             />
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <hr />
                         <div>
                              <h4>
                                   <b>
                                        <u>DATA TERLAPOR</u>
                                   </b>
                              </h4>
                         </div>
                         <div className="columns">
                              <div className="column is-centered is-2">
                                   <div>
                                        <figure className="image is-1by1">
                                             <img src={`http://localhost:8000/uploads/fotoWajah/${formFile?.fotoWajah}`} alt="Foto Wajah" />
                                        </figure>
                                   </div>
                                   <br />
                                   <div className="is-centered has-text-centered">
                                        <h2>
                                             <b>{dataPelaporanById?.namaTerlapor || ""}</b>
                                        </h2>
                                        <h4>
                                             {dataPelaporanById?.alamat},{" "}
                                             {dataPelaporanById?.namaKelurahan},{" "}
                                             {dataPelaporanById?.namaKecamatan}
                                        </h4>
                                   </div>
                              </div>

                              <div className="column is-10">
                                   <div className="columns">
                                        <div className="column">
                                             <div className="field">
                                                  <label className="label">Nama Terlapor</label>
                                                  <div className="control">
                                                       <input
                                                            placeholder="Nama Terlapor"
                                                            autoComplete="namaTerlapor"
                                                            className="input"
                                                            name="namaTerlapor"
                                                            required
                                                            type="text"
                                                            value={
                                                                 dataPelaporanById?.namaTerlapor || ""
                                                            }
                                                            onChange={(e) => {
                                                                 setDataPelaporanById({
                                                                      ...dataPelaporanById,
                                                                      namaTerlapor: e.target.value,
                                                                 });
                                                            }}
                                                       />
                                                  </div>
                                                  {/* <p className="help has-text-left">Required. Your current password</p> */}
                                             </div>
                                             <div className="field">
                                                  <label className="label">
                                                       Nama Ibu Kandung
                                                  </label>
                                                  <div className="control">
                                                       <input
                                                            placeholder="Nama Ibu Kandung"
                                                            autoComplete="namaIbuKandung"
                                                            className="input"
                                                            name="namaIbuKandung"
                                                            required
                                                            type="text"
                                                            value={
                                                                 dataPelaporanById?.namaIbuKandung || ""
                                                            }
                                                            onChange={(e) => {
                                                                 setDataPelaporanById({
                                                                      ...dataPelaporanById,
                                                                      namaIbuKandung: e.target.value,
                                                                 });
                                                            }}
                                                       />
                                                  </div>
                                                  {/* <p className="help">Required. Your current password</p> */}
                                             </div>
                                             <div className="field">
                                                  <label className="label">Kelurahan</label>
                                                  <div className="control is-expanded">
                                                       <div className="select is-fullwidth">
                                                            <select
                                                                 name="kelurahanId"
                                                                 value={dataPelaporanById.kelurahanId}
                                                                 className="select-custom"
                                                                 onChange={handleInputChange}
                                                                 defaultValue={
                                                                      dataPelaporanById.namaKelurahan
                                                                 }
                                                            >
                                                                 {kelurahanList
                                                                      .filter(
                                                                           (kelurahan) =>
                                                                                kelurahan.kecamatanId ===
                                                                                dataPelaporanById.kecamatanId
                                                                      )
                                                                      .map((kelurahan, index) => (
                                                                           <option
                                                                                key={index}
                                                                                value={kelurahan.id}
                                                                           >
                                                                                {kelurahan.namaKelurahan}
                                                                           </option>
                                                                      ))}
                                                            </select>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="field">
                                                  <label className="label is-flex is-justify-content-space-between">
                                                       Surat Kartu Keluarga (KK) :
                                                  </label>
                                                  <div className='field is-grouped is-flex is-align-items-center'>
                                                       <div className="control is-expanded">
                                                            <input
                                                                 autoComplete="scaKK"
                                                                 className="input"
                                                                 name="scanKK"
                                                                 type="file"
                                                                 onChange={handleInputFile}
                                                            />
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="field">
                                                  <label className="label is-flex is-justify-content-space-between">
                                                       Surat KTP :
                                                  </label>
                                                  <div className="control">
                                                       <input
                                                            autoComplete="scanKTP"
                                                            className="input"
                                                            name="scanKTP"
                                                            type="file"
                                                            onChange={handleInputFile}
                                                       />
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="column">
                                             <div className="field">
                                                  <label className="label">Jenis Kelamin</label>
                                                  <div className="control is-expanded">
                                                       <div className="select is-fullwidth">
                                                            <select
                                                                 name="jenisKelaminId"
                                                                 className="select-custom"
                                                                 value={dataPelaporanById.jenisKelaminId}
                                                                 onChange={handleInputChange}
                                                                 defaultValue={
                                                                      dataPelaporanById.jenisKelaminId
                                                                 }
                                                            >
                                                                 {jenisKelaminList.map((jenisKelamin, index) => (
                                                                      <option key={index} value={jenisKelamin.id}>
                                                                           {jenisKelamin.jenisKelamin}
                                                                      </option>
                                                                 ))}
                                                            </select>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="field">
                                                  <label className="label">
                                                       Nama Ayah Kandung
                                                  </label>
                                                  <div className="control">
                                                       <input
                                                            placeholder="Nama Ayah Kandung"
                                                            autoComplete="namaAyahKandung"
                                                            className="input"
                                                            name="namaAyahKandung"
                                                            required
                                                            type="text"
                                                            value={
                                                                 dataPelaporanById?.namaAyahKandung || ""
                                                            }
                                                            onChange={(e) => {
                                                                 setDataPelaporanById({
                                                                      ...dataPelaporanById,
                                                                      namaAyahKandung: e.target.value,
                                                                 });
                                                            }}
                                                       />
                                                  </div>
                                                  {/* <p className="help">Required. Your current password</p> */}
                                             </div>
                                             <div className="field">
                                                  <label className="label">Kecamatan</label>
                                                  <div className="control is-expanded">
                                                       <div className="select is-fullwidth">
                                                            <select
                                                                 name="kecamatanId"
                                                                 className="select-custom"
                                                                 value={dataPelaporanById.kecamatanId}
                                                                 onChange={handlekecamatanId}
                                                                 defaultValue={
                                                                      dataPelaporanById.namaKecamatan
                                                                 }
                                                            >
                                                                 {kecamatanList.map((kecamatan, index) => (
                                                                      <option
                                                                           key={index}
                                                                           value={kecamatan.kodeWilayahKec}
                                                                      >
                                                                           {kecamatan.namaKecamatan}
                                                                      </option>
                                                                 ))}
                                                            </select>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div className="field">
                                                  <label className="label is-flex is-justify-content-space-between">
                                                       Surat Akta Kelahiran :
                                                  </label>
                                                  <div className="control">
                                                       <input
                                                            autoComplete="scanAkta"
                                                            className="input"
                                                            name="scanAkta"
                                                            type="file"
                                                            onChange={handleInputFile}
                                                       />
                                                  </div>
                                                  {/* <p className="help">Required. Your current password</p> */}
                                             </div>
                                             <div className="field">
                                                  <label className="label is-flex is-justify-content-space-between">
                                                       Surat Dokumen Lain :
                                                  </label>
                                                  <div className="control">
                                                       <input
                                                            autoComplete="scanDokumenLain"
                                                            className="input"
                                                            name="scanDokumenLain"
                                                            type="file"
                                                            onChange={handleInputFile}
                                                       />
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="column">
                                             <div className="field">
                                                  <label className="label">Tempat Lahir</label>
                                                  <div className="control">
                                                       <input
                                                            placeholder="Tempat Lahir"
                                                            autoComplete="tempatLahir"
                                                            className="input"
                                                            name="tempatLahir"
                                                            required
                                                            type="text"
                                                            value={dataPelaporanById?.tempatLahir || ""}
                                                            onChange={(e) => {
                                                                 setDataPelaporanById({
                                                                      ...dataPelaporanById,
                                                                      tempatLahir: e.target.value,
                                                                 });
                                                            }}
                                                       />
                                                  </div>
                                             </div>
                                             <div className="field">
                                                  <label className="label">Tanggal Lahir</label>
                                                  <div className="control">
                                                       <input
                                                            placeholder="Tanggal Lahir"
                                                            autoComplete="tanggalLahir"
                                                            className="input"
                                                            name="tanggalLahir"
                                                            required
                                                            type="date"
                                                            value={
                                                                 dataPelaporanById?.tanggalLahir?.split(
                                                                      "T"
                                                                 )[0]
                                                            }
                                                            onChange={(e) => {
                                                                 setDataPelaporanById({
                                                                      ...dataPelaporanById,
                                                                      tanggalLahir: e.target.value,
                                                                 });
                                                            }}
                                                       />
                                                  </div>
                                                  {/* <p className="help">Required. Your current password</p> */}
                                             </div>
                                             <div className="field">
                                                  <label className="label">Alamat Lengkap</label>
                                                  <div className="control">
                                                       <textarea
                                                            placeholder="Alamat Lengkap"
                                                            autoComplete="alamat"
                                                            className="textarea select-custom"
                                                            value={dataPelaporanById?.alamat || ""}
                                                            onChange={(e) => {
                                                                 setDataPelaporanById({
                                                                      ...dataPelaporanById,
                                                                      alamat: e.target.value,
                                                                 });
                                                            }}
                                                       ></textarea>
                                                  </div>
                                             </div>
                                             <div className="field">
                                                  <label className="label is-flex is-justify-content-space-between">
                                                       Surat Ijazah :
                                                  </label>
                                                  <div className="control">
                                                       <input
                                                            autoComplete="scanIjazah"
                                                            className="input"
                                                            name="scanIjazah"
                                                            type="file"
                                                            onChange={handleInputFile}
                                                       />
                                                  </div>
                                                  {/* <p className="help">Required. Your current password</p> */}
                                             </div>
                                        </div>
                                   </div>
                                   <div className="columns">
                                        <div className="column">
                                             <div className="field">
                                                  <RequiredLabel children="Kerentanan" />
                                                  <div className="control">
                                                       <textarea
                                                            placeholder="Kerentanan"
                                                            className="textarea select-custom"
                                                            value={dataPelaporanById?.kerentanan || ""}
                                                            readOnly
                                                       ></textarea>
                                                  </div>
                                             </div>
                                        </div>
                                        <div className="column">
                                             <div className="field">
                                                  <RequiredLabel children="Kebutuhan Khusus" />
                                                  <div className="control">
                                                       <textarea
                                                            placeholder="Kebutuhan Khusus"
                                                            className="textarea select-custom"
                                                            value={
                                                                 dataPelaporanById?.kebutuhanKhusus || ""
                                                            }
                                                            readOnly
                                                       ></textarea>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <hr />
                         {/* DATA PETUGAS PEREKAMAN */}
                         {/* <div>
                              <h4>
                                   <b>
                                        <u>DATA PETUGAS PEREKAMAN</u>
                                   </b>
                              </h4>
                         </div> */}
                         {/* <div className="columns">
                              <div className="column">
                                   <div className="field">
                                        <label className="label">Petugas 1</label>
                                        <div className="control is-expanded">
                                             <div className="select is-fullwidth">
                                                  <select
                                                       name="petugasOne"
                                                       value={dataPerekaman.petugasOne}
                                                       onChange={handleInputPerekaman}
                                                  >
                                                       {petugasList.map((petugas, index) => (
                                                            <option key={index} value={petugas.id}>
                                                                 {petugas.namaPetugas}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </div>
                                        </div> 
                                   </div>
                              </div>
                              <div className="column">
                                   <div className="field">
                                        <label className="label">Waktu dan Tanggal</label>
                                        <div className="control">
                                             <input
                                                  autoComplete="tanggalPerekaman"
                                                  className="input"
                                                  name="tanggalPerekaman"
                                                  type="datetime-local"
                                                  value={dataPerekaman.tanggalPerekaman}
                                                  onChange={handleInputPerekaman}
                                             />
                                        </div> 
                                   </div>
                              </div>
                         </div> */}
                         {/* <div className="columns">
                              <div className="column">
                                   <div className="field">
                                        <label className="label">Petugas 2</label>
                                        <div className="control is-expanded">
                                             <div className="select is-fullwidth">
                                                  <select
                                                       name="petugasTwo"
                                                       value={dataPerekaman.petugasTwo}
                                                       onChange={handleInputPerekaman}
                                                  >
                                                       {petugasList.map((petugas, index) => (
                                                            <option key={index} value={petugas.id}>
                                                                 {petugas.namaPetugas}
                                                            </option>
                                                       ))}
                                                  </select>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              <div className="column">
                                   <div className="field">
                                        <label className="label">Hasil Perekaman</label>
                                        <div className='field is-grouped is-flex is-align-items-center'>
                                             <div className="control is-expanded">
                                                  <input
                                                       autoComplete="dokumenHasilPerekaman"
                                                       className="input"
                                                       name="dokumenHasilPerekaman"
                                                       type="file"
                                                       onChange={handleFileHasilPerekaman}
                                                  />
                                             </div>
                                             <button
                                                  className="button is-success"
                                                  type="button" onClick={() => openModal('dokumenHasilPerekaman')}
                                             >
                                                  <OpenInBrowserIcon />
                                             </button>
                                        </div>
                                   </div>
                              </div>
                         </div> */}
                         <div className="columns">
                              <div className="column is-flex is-justify-content-flex-end ">
                                   <div className="field">
                                        <div className="field-body">
                                             <div className="field">
                                                  <div className="control">
                                                       <button
                                                            className="button is-link"
                                                            type="submit"
                                                       >
                                                            <span className="icon is-small has-text-white">
                                                                 <DoneAllIcon />
                                                            </span>
                                                            <span className="has-text-white">Simpan Data</span>
                                                       </button>
                                                  </div>
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                    </form>
               </div>

               {loading && <Loading />}

               {success && <SuccessAlert status={success} />}

               {error && <DangerAlert status={error} />}
          </div>
     )
}

const EditPelaporan = () => {
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
                         <Header nama="Edit Laporan" />
                         <div className="section is-main-section" id="SectionContent">
                              <div className="box" id="BoxContent">
                                   {/* FORM EDIT PELAPORAN */}
                                   <FormEditPelaporan />
                              </div>
                         </div>

                    </div>
               </div>

          </section>
     )
}

export default withAuth(EditPelaporan);