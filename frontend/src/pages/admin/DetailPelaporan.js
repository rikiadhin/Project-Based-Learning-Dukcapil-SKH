import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import * as ModalFile from "../../components/modal/allModal";
import axios from "axios";
import dayjs from "dayjs"; 
import { decryptId } from "../../utils/Enskripsi";
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import EditNoteIcon from '@mui/icons-material/EditNote';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import MessageIcon from '@mui/icons-material/Message';
import withAuth from '../../utils/AuthLogin'
import { Loading } from '../../components/loading/loading'
import { SuccessAlert, DangerAlert } from '../../components/alert/alert';
import "../../styles/BoxContent.css"

const TabelPelaporan = () => {
  const [modalOpenReject, setModalOpenReject] = useState(false);
  const [dataPelaporanById, setDataPelaporanById] = useState({
    id: "",
    namaPelapor: "",
    nomorNIK: "",
    nomorWA: "",
    statusHubungan: "",

    namaTerlapor: "",
    jenisKelamin: "",
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

    fotoWajah: "",
    scanKK: "",
    scanKTP: "",
    scanIjazah: "",
    scanAkta: "",
    scanDokumenLain: "",

    kodePelaporan: "",
    tanggalPelaporan: "",
    statusLayanan: "",
  });
  const [sendNotification, setSendNotification] = useState({
    name: "",
    status: "",
    pesan: "",
    nomorWA: "",
  });
  const [modalState, setModalState] = useState({
    modalFotoWajah: false,
    modalKK: false,
    modalAkta: false,
    modalIjazah: false,
    modalKTP: false,
    modalDokumenLain: false
  });
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const decryptedId = decryptId(id);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [errorModal, setErrorModal] = useState(null); 
  const apiUrl = process.env.REACT_APP_API_URL;
  const url = process.env.REACT_APP_API_URL_AUTH;
  const token = localStorage.getItem('token');
  
  const getDataPelaporanById = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/terlapor/${decryptedId}`, {
        headers: {
          'token': token
        }
      }
      );
      const data = response.data;
      setDataPelaporanById({
        id: data.id,
        namaPelapor: data.Pelapor.namaPelapor,
        nomorNIK: data.Pelapor.nomorNIK,
        nomorWA: data.Pelapor.nomorWA,
        statusHubungan: data.Pelapor.Hubungan.statusHubungan,

        namaTerlapor: data.namaTerlapor,
        jenisKelamin: data.JenisKelamin.jenisKelamin,
        tempatLahir: data.tempatLahir,
        tanggalLahir: dayjs(data.tanggalLahir).locale("id").format("DD MMMM YYYY"),
        namaIbuKandung: data.namaIbuKandung,
        namaAyahKandung: data.namaAyahKandung,
        alamat: data.alamat,
        namaKelurahan: data.Kelurahan.namaKelurahan,
        namaKecamatan: data.Kelurahan.Kecamatan.namaKecamatan,
        kerentanan: data.TerlaporRentans.map(
          (rentan) => rentan.Kerentanan.namaKerentanan
        ).join(", "),
        kebutuhanKhusus: data.TerlaporKhusus.map(
          (rentan) => rentan.KebutuhanKhusu.namaKebutuhanKhusus
        ).join(", "),

        fotoWajah: data.fotoWajah,
        scanKK: data.scanKK,
        scanKTP: data.scanKTP,
        scanIjazah: data.scanIjazah,
        scanAkta: data.scanAkta,
        scanDokumenLain: data.scanDokumenLain,

        kodePelaporan: data.Pelaporan.kodePelaporan,
        tanggalPelaporan: dayjs(data.Pelaporan.tanggalPelaporan).locale("id").format(
          "HH:mm:ss - DD MMMM YYYY"
        ),
        statusLayanan: data.Pelaporan.statusLayanan,
      });
      setSendNotification({
        name: data.Pelapor.namaPelapor,
        nomorWA: data.Pelapor.nomorWA,
      }); 
    } catch (error) {
      setError("Failed to fetch data"); 
    }
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    document.title = 'Admin | Detail Laporan';
    getDataPelaporanById();
  }, []);

  const handleModalToggleReject = () => {
    setModalOpenReject(!modalOpenReject);
  };

  const handleSendNotification = (e) => {
    const { name, value } = e.target;
    setSendNotification((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrorModal("");
  };

  const handleSubmitSendNotification = async (e) => {
    e.preventDefault();
    if (
      sendNotification?.status == undefined ||
      !sendNotification?.status ||
      sendNotification?.status == "Pilih status..."
    ) {
      setErrorModal("Status harus dipilih.");
      return;
    }
    if (sendNotification?.pesan == undefined || !sendNotification?.pesan) {
      setErrorModal("Pesan harus di isi.");
      return;
    }
    setModalOpenReject(false);
    setLoading(true);
    const updatePelaporan = {
      namaPelapor: sendNotification?.name,
      statusLayanan: sendNotification?.status,
      nomorWA: sendNotification?.nomorWA,
      pesan: sendNotification?.pesan,
    };
    try {
      console.log("isi pesan: ", updatePelaporan);
      const response = await axios.patch(
        `${apiUrl}/pelaporan/${decryptedId}`,
        updatePelaporan
      );
      setLoading(false);
      getDataPelaporanById();
      setSuccess(response.data.msg);
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
  };

  const openModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: true
    }));
  };

  const closeModal = (modalName) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: false
    }));
  };

  return (
    <div className="card">
      <header className="card-header">
        <h3 className="card-header-title">
          <span className="icon is-medium mr-2">
            <FeedOutlinedIcon />
          </span>
          <span>Detail Laporan</span>
        </h3>
        <div className="field is-horizontal m-1">
          <div className="field-body">
            <div className="field">
              <div className="control">
                <Link to={`/dashboard/edit-pelaporan/${id}`} className="button is-link"
                  type="button">
                  <span className="icon has-text-white">
                    <EditNoteIcon />
                  </span>
                  <span className="has-text-white">Edit data</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="card-content">
        <b>DATA LAPORAN</b>
        <div className="table-container">
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th className='is-dark has-text-white'>Nomor</th>
                <th className='is-dark has-text-white'>Data Laporan</th>
                <th className='is-dark has-text-white'>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Kode Pelaporan</td>
                <td>{dataPelaporanById.kodePelaporan}</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Waktu laporan masuk</td>
                <td>{dataPelaporanById.tanggalPelaporan}</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Status laporan</td>
                <td>{dataPelaporanById.statusLayanan}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <b>DATA PELAPOR</b>
        <div className="table-container">
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th className='is-dark has-text-white'>Nomor</th>
                <th className='is-dark has-text-white'>Data Terlapor</th>
                <th className='is-dark has-text-white'>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Nama Pelapor</td>
                <td>{dataPelaporanById.namaPelapor}</td>
              </tr>
              <tr>
                <th>2</th>
                <td>Nomor NIK</td>
                <td>{dataPelaporanById.nomorNIK}</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Nomor WhatsApp</td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.nomorWA}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => window.open(`https://wa.me/62${dataPelaporanById?.nomorWA?.substring(
                        1
                      )}`)}>
                        <WhatsAppIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>4</th>
                <td>Hubungan dengan terlapor</td>
                <td>{dataPelaporanById.statusHubungan}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <b>DATA TERLAPOR</b>
        <div className="table-container">
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th className='is-dark has-text-white'>Nomor</th>
                <th className='is-dark has-text-white'>Data Terlapor</th>
                <th className='is-dark has-text-white'>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Foto Wajah</td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.fotoWajah}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => openModal('modalFotoWajah')}>
                        <OpenInBrowserIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>2</th>
                <td>Nama Terlapor</td>
                <td>{dataPelaporanById.namaTerlapor}</td>
              </tr>
              <tr>
                <th>3</th>
                <td>Nama Terlapor</td>
                <td>{dataPelaporanById.jenisKelamin}</td>
              </tr>
              <tr>
                <th>4</th>
                <td>Tempat, Tanggal Lahir</td>
                <td>{dataPelaporanById.tempatLahir}, {dataPelaporanById.tanggalLahir}</td>
              </tr>
              <tr>
                <th>5</th>
                <td>Nama Ayah Kandung</td>
                <td>{dataPelaporanById.namaAyahKandung}</td>
              </tr>
              <tr>
                <th>6</th>
                <td>Nama Ibu Kandung</td>
                <td>{dataPelaporanById.namaIbuKandung}</td>
              </tr>
              <tr>
                <th>7</th>
                <td>Alamat lengkap</td>
                <td>{dataPelaporanById.alamat}</td>
              </tr>
              <tr>
                <th>8</th>
                <td>Kelurahan, Kecamatan</td>
                <td>{dataPelaporanById.namaKelurahan}, {dataPelaporanById.namaKecamatan}</td>
              </tr>
              <tr>
                <th>9</th>
                <td>Kerentanan</td>
                <td>{dataPelaporanById.kerentanan}</td>
              </tr>
              <tr>
                <th>10</th>
                <td>Kebutuhan Khusus</td>
                <td>{!dataPelaporanById.kebutuhanKhusus ? 'Tidak berkebutuhan khusus' : dataPelaporanById.kebutuhanKhusus}</td>
              </tr>
              <tr>
                <th>11</th>
                <td>Scan Kartu Keluarga (KK) </td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.scanKK == 'scanKK_undefined' ? "-" : dataPelaporanById.scanKK}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => openModal('modalKK')}>
                        <OpenInBrowserIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>12</th>
                <td>Scan Kartu Tanda Penduduk (KTP)</td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.scanKTP == 'scanKTP_undefined' ? "-" : dataPelaporanById.scanKTP}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => openModal('modalKTP')}>
                        <OpenInBrowserIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>13</th>
                <td>Scan Ijazah</td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.scanIjazah == 'scanIjazah_undefined' ? "-" : dataPelaporanById.scanIjazah}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => openModal('modalIjazah')}>
                        <OpenInBrowserIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>14</th>
                <td>Scan Akta Kelahiran</td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.scanAkta == 'scanAkta_undefined' ? "-" : dataPelaporanById.scanAkta}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => openModal('modalAkta')}>
                        <OpenInBrowserIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>15</th>
                <td>Scan Dokumen Pendukung</td>
                <td>
                  <div className="level">
                    <div className="level-left">
                      {dataPelaporanById.scanDokumenLain == 'scanDokumenLain_undefined' ? "-" : dataPelaporanById.scanDokumenLain}
                    </div>
                    <div className="level-right">
                      <span className="icon button is-primary" onClick={() => openModal('modalDokumenLain')}>
                        <OpenInBrowserIcon />
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="column is-flex is-align-items-center is-justify-content-center has-text-centered">
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <div className="control">
                  <button
                    className="button is-danger is-outlined"
                    onClick={handleModalToggleReject}
                    type="button"
                  >
                    <span className="icon is-small">
                      <MessageIcon />
                    </span>
                    <span>Verifikasi laporan</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading && <Loading />}
      {success && <SuccessAlert status={success} />}

      {error && <DangerAlert status={error} />}
      {modalOpenReject && (
        <div className="modal is-active">
          <div className="modal-background"></div>
          <div className="modal-card is-flex is-justify-content-center">
            <header className="modal-card-head has-text-centered">
              <p className="modal-card-title is-centered">KIRIM VALIDASI</p>
              <button
                className="delete"
                aria-label="close"
                type="button"
                onClick={handleModalToggleReject}
              ></button>
            </header>
            <section className="modal-card-body is-center">
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Nama Pelapor</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <input
                        placeholder="Nama Pelapor"
                        autoComplete="on"
                        className="input"
                        name="name"
                        value={sendNotification?.name}
                        required
                        type="text"
                        onChange={handleSendNotification}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Status</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control is-expanded">
                      <div className="select is-fullwidth">
                        <select
                          name="status"
                          value={sendNotification?.status}
                          onChange={handleSendNotification}
                          required
                        >
                          <option value={null}>Pilih status...</option>
                          <option value={"Verifikasi"}>DI TERIMA</option>
                          <option value={"Di tolak"}>DI TOLAK</option>
                          <option value={"Selesai"}>SELESAI</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="field is-horizontal">
                <div className="field-label is-normal">
                  <label className="label">Pesan</label>
                </div>
                <div className="field-body">
                  <div className="field">
                    <div className="control">
                      <textarea
                        className="textarea"
                        placeholder="Masukkan pesan"
                        name="pesan"
                        required
                        value={sendNotification.pesan}
                        onChange={handleSendNotification}
                      ></textarea>

                    </div>
                  </div>
                </div>
              </div>
              {errorModal && <p className="help is-danger error-message">{errorModal}</p>}
            </section>
            <footer className="modal-card-foot is-flex is-justify-content-center">
              <div className="buttons has-text-centered">
                <button
                  type="submit"
                  className="button is-success"
                  onClick={handleSubmitSendNotification}
                >
                  Kirim Pesan
                </button>
                <button
                  onClick={handleModalToggleReject}
                  type="button"
                  className="button"
                >
                  Cancel
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
      {modalState.modalFotoWajah && (
        <ModalFile.ModalImageOnly
          src={`${url}/uploads/fotoWajah/${dataPelaporanById.fotoWajah}`}
          alt="Foto Wajah"
          onClose={() => closeModal('modalFotoWajah')}
        />
      )}
      {modalState.modalKK && (
        <ModalFile.ModalImageScan
          src={`${url}/uploads/scanKK/${dataPelaporanById.scanKK}`}
          alt="Kartu Keluarga"
          onClose={() => closeModal('modalKK')}
        />
      )}
      {modalState.modalAkta && (
        <ModalFile.ModalImageScan
          src={`${url}/uploads/scanAkta/${dataPelaporanById.scanAkta}`}
          alt="Akta Kelahiran"
          onClose={() => closeModal('modalAkta')}
        />
      )}
      {modalState.modalIjazah && (
        <ModalFile.ModalImageScan
          src={`${url}/uploads/scanIjazah/${dataPelaporanById.scanIjazah}`}
          alt="Ijazah"
          onClose={() => closeModal('modalIjazah')}
        />
      )}
      {modalState.modalKTP && (
        <ModalFile.ModalImageScan
          src={`${url}/uploads/scanKTP/${dataPelaporanById.scanKTP}`}
          alt="Kartu Tanda Penduduk"
          onClose={() => closeModal('modalKTP')}
        />
      )}
      {modalState.modalDokumenLain && (
        <ModalFile.ModalImageScan
          src={`${url}/uploads/scanDocLain/${dataPelaporanById.scanDokumenLain}`}
          alt="Dokumen Pendukung"
          onClose={() => closeModal('modalDokumenLain')}
        />
      )}
    </div>
  )
}

const DetailPelaporan = () => {
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
          <Header nama="Detail Laporan" />
          <div className="section is-main-section" id="SectionContent">
            <div className="box" id="BoxContent">
              {/* DETAIL PELAPORAN */}
              <TabelPelaporan />
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}

export default withAuth(DetailPelaporan);