// import * as AdminComponent from "../../components/adminComponents";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import '../assets/css/Detail.css'; 
// import { decryptId } from "../../utils/getDataApi";
// import RequiredLabel from "../../components/requiredLabel";
// import { Loading } from "../../components/loading";
// import Alert from "@mui/material/Alert";
import dayjs from "dayjs";

const PersonDetail = () => {
  const [modalOpenAccept, setModalOpenAccept] = useState(false);
  const [modalOpenReject, setModalOpenReject] = useState(false);
  const [dataPelaporanById, setDataPelaporanById] = useState({
    id: "",
    namaPelapor: "",
    nomorNIK: "",
    nomorWA: "",
    hubunganId: "",
    statusHubungan: "",

    namaTerlapor: "",
    alamat: "",
    kelurahanId: "",
    kecamatanId: "",
    namaKelurahan: "",
    namaKecamatan: "",
    tempatLahir: "",
    tanggalLahir: "",
    namaIbuKandung: "",
    namaAyahKandung: "",
    scanKK: "",
    scanAkta: "",
    scanIjazah: "",
    scanKTP: "",
    scanDokumenLain: "",
    kerentanan: "",
    kebutuhanKhusus: "",
    tanggalPelaporan: "",
    statusLayanan: "",
  });
  const [sendNotification, setSendNotification] = useState({
    name: "",
    status: "",
    keterangan: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [hubunganList, setHubunganList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [kelByKec, setkelByKec] = useState([]);

  const handleModalToggleAccept = () => {
    setModalOpenAccept(!modalOpenAccept);
  };
  const handleModalToggleReject = () => {
    setModalOpenReject(!modalOpenReject);
  };

  const getDataPelaporanById = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/terlapor/${id}`
      );
      const data = response.data;
      setDataPelaporanById({
        id: data.id,
        namaPelapor: data.Pelapor.namaPelapor,
        nomorNIK: data.Pelapor.nomorNIK,
        nomorWA: data.Pelapor.nomorWA,
        hubunganId: data.Pelapor.hubunganId,
        statusHubungan: data.Pelapor.Hubungan.statusHubungan,
        kelurahanId: data.kelurahanId,
        kecamatanId: data.Kelurahan.kecamatanId,
        namaKelurahan: data.Kelurahan.namaKelurahan,
        namaKecamatan: data.Kelurahan.Kecamatan.namaKecamatan,
        namaTerlapor: data.namaTerlapor,
        alamat: data.alamat,
        namaKelurahan: data.Kelurahan.namaKelurahan,
        namaKecamatan: data.Kelurahan.Kecamatan.namaKecamatan,
        tempatLahir: data.tempatLahir,
        tanggalLahir: data.tanggalLahir,
        namaIbuKandung: data.namaIbuKandung,
        namaAyahKandung: data.namaAyahKandung,
        scanKK: data.scanKK,
        scanAkta: data.scanAkta,
        scanIjazah: data.scanIjazah,
        scanKTP: data.scanKTP,
        scanDokumenLain: data.scanDokumenLain,
        kerentanan: data.TerlaporRentans.map(
          (rentan) => rentan.Kerentanan.namaKerentanan
        ).join(", "),
        kebutuhanKhusus: data.TerlaporKhusus.map(
          (rentan) => rentan.KebutuhanKhusu.namaKebutuhanKhusus
        ).join(", "),
        tanggalPelaporan: dayjs(data.Pelaporan.tanggalPelaporan).format(
          "HH:mm:ss DD-MM-YYYY"
        ),
        statusLayanan: data.Pelaporan.statusLayanan,
      });
      setLoading(false);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  const getHubungans = async () => {
    const response = await axios.get("http://localhost:8000/api/hubungans");
    setHubunganList(response.data);
  };

  const getKecamatans = async () => {
    const response = await axios.get("http://localhost:8000/api/kecamatans");
    setKecamatanList(response.data);
  };
  const getKelurahans = async () => {
    const response = await axios.get("http://localhost:8000/api/kelurahans");
    setKelurahanList(response.data); 
    console.log("ini response.data", response.data);
  }; 

  useEffect(() => {
    getDataPelaporanById();
    getHubungans();
    getKecamatans();
    getKelurahans();  
  }, []);

  const updateDataPelaporan = async (e) => {
    e.preventDefault();
    const dataPelapor = {
      namaPelapor: dataPelaporanById?.namaPelapor,
      nomorWA: dataPelaporanById?.nomorWA,
      hubunganId: dataPelaporanById?.hubunganId,
      nomorNIK: dataPelaporanById?.nomorNIK,
    };

    const dataTerlapor = {
      namaTerlapor: dataPelaporanById?.namaTerlapor,
      namaIbuKandung: dataPelaporanById?.namaIbuKandung,
      kelurahanId: dataPelaporanById?.kelurahanId,
      tempatLahir: dataPelaporanById?.tempatLahir,
      namaAyahKandung: dataPelaporanById?.namaAyahKandung,
      alamat: dataPelaporanById?.alamat,
      tanggalLahir: dataPelaporanById?.tanggalLahir,
      scanKK: dataPelaporanById?.scanKK,
      scanAkta: dataPelaporanById?.scanAkta,
      scanIjazah: dataPelaporanById?.scanIjazah,
      scanKTP: dataPelaporanById?.scanKTP,
      scanDokumenLain: dataPelaporanById?.scanDokumenLain,
    };

    try {
      console.log("ini data pelapor : ", dataTerlapor);
      const response = await Promise.all([
            axios.patch(`http://localhost:8000/api/pelapor/${id}`, dataPelapor),
            axios.patch(`http://localhost:8000/api/terlapor/${id}`, dataTerlapor),
          ]);

          console.log("Data Pelapor berhasil diupdate:", response[0].data.msg);
          console.log("Data Terlapor berhasil diupdate:", response[1].data.msg);
      // setSuccess(response.data.msg);
      // navigate("/");
    } catch (error) {
      setError(error.response?.data?.msg || "Error updating data");
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

  const handleSendNotification = (e) => {
    const { name, value } = e.target;
    setSendNotification((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  function handlekecamatanId(event) {
    console.log(event.target.value);
    const id = event.target.value;
    setDataPelaporanById((prevState) => ({
      ...prevState,
      kecamatanId: id, 
    }));
    const getKelurahanByIdKecamatan = kelurahanList.filter(
      (x) => x.kecamatanId == id
    );
    setkelByKec(getKelurahanByIdKecamatan);
  }

  return (
    <div>
      {/* {loading && <Loading />} */}

      {!loading && (
        <html>
          <head>
            <meta charSet="utf-8" />
            <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <title>Tables - Admin One HTML - Bulma Admin Dashboard</title>
            <link href="../../css/main.min.css" rel="stylesheet" />
            <link href="https://fonts.gstatic.com" rel="dns-prefetch" />
            <link
              href="https://fonts.googleapis.com/css?family=Nunito"
              rel="stylesheet"
              type="text/css"
            />
          </head>
          <body>
            <div id="app">
              {/* NAVBARR  */}
              {/* <AdminComponent.NavBar name={"John Doe Aja ?"} /> */}

              {/* SIDEBAR  */}
              {/* <AdminComponent.SideBar /> */}

              {/* BREADCRUMBS */}
              {/* <AdminComponent.BreadCrumbs /> */}

              {/* DASHBOARD */}
              {/* <AdminComponent.DivNamePage /> */}

              {/* DATA  */}
              <section className="section is-main-section has-background-white">
                <div className="card has-background-white ">
                  <header className="card-header ">
                    <h4 className="card-header-title has-text-black">
                      <span className="icon">
                        <i className="mdi mdi-account-card-details default" />
                      </span>
                      Detail Laporan - KODE
                    </h4>
                    <div className="field is-horizontal m-1 mr-5">
                      <div className="field-body">
                        <div className="field">
                          <div className="control">
                            <button className="button is-success button-custom-simpan">
                              <span className="icon is-small">
                                <i className="mdi mdi-check-all"></i>
                              </span>
                              <span>Selesai</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </header>

                  <div className="card-content has-text-black">
                    <form onSubmit={updateDataPelaporan}>
                      <div>
                        <h4 className="has-text-black">
                          <b>
                            <u>DATA PELAPOR</u>
                          </b>
                        </h4>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <div className="field ">
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
                            <div className="field is-grouped is-flex is-align-items-center">
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
                              <a
                                href={`https://wa.me/62${dataPelaporanById?.nomorWA?.substring(
                                  1
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="button is-success button-custom-wa" // Tambahkan kelas khusus di sini
                              >
                                <i className="mdi mdi-whatsapp is-success mdi-22px"></i>
                              </a>
                            </div>
                            {/* <p className="help">Required. Your current password</p> */}
                          </div>

                          <div className="field">
                            <label className="label">Hubungan</label>
                            <div className="control is-expanded">
                              <div className="select is-fullwidth">
                                <select
                                  name="hubunganId"
                                  value={dataPelaporanById.hubunganId}
                                  onChange={handleInputChange}
                                  className="select-custom"
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
                            <label className="label">Tanggal Pelaporan</label>
                            {/* <RequiredLabel children="Tanggal Pelaporan" /> */}
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
                            <label className="label">Status Layanan</label>
                            {/* <RequiredLabel children="Status Layanan" /> */}
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
                        <h4 className="has-text-black">
                          <b>
                            <u>DATA TERLAPOR</u>
                          </b>
                        </h4>
                      </div>
                      <div className="columns">
                        <div className="column is-centered is-2">
                          <div>
                            <figure className="image is-1by1">
                              <img src="/assets/check.svg" />
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
                                      onChange={handleInputChange}
                                      defaultValue={
                                        dataPelaporanById.namaKelurahan
                                      }
                                      className="select-custom" // Tambahkan kelas khusus di sini
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
                                  <span className="icon is-right">
                                    <a href="#" target="_blank" id="kk-link">
                                      <i className="mdi mdi-open-in-app mdi-36px"></i>
                                    </a>
                                  </span>
                                </label>
                                <div className="control has-icons-right">
                                  <input
                                    autoComplete="scaKK"
                                    className="input"
                                    name="scanKK"
                                    type="file"
                                    value={dataPelaporanById?.scanKK || ""}
                                    onChange={(e) => {
                                      setDataPelaporanById({
                                        ...dataPelaporanById,
                                        scanKK: e.target.value,
                                      });
                                    }}
                                  />
                                </div>
                                {/* <p className="help">Required. Your current password</p> */}
                              </div>
                              <div className="field">
                                <label className="label is-flex is-justify-content-space-between">
                                  Surat KTP :
                                  <span className="icon is-right">
                                    <a href="#" target="_blank" id="kk-link">
                                      <i className="mdi mdi-open-in-app mdi-36px"></i>
                                    </a>
                                  </span>
                                </label>
                                <div className="control">
                                  <input
                                    autoComplete="current-password"
                                    className="input"
                                    name="password_current"
                                    type="file"
                                    value={dataPelaporanById?.scanKTP || ""}
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
                                {/* <p className="help has-text-left">Required. Your current password</p> */}
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
                                      value={dataPelaporanById.kecamatanId}
                                      onChange={handlekecamatanId}
                                      defaultValue={
                                        dataPelaporanById.namaKecamatan
                                      }
                                      className="select-custom" // Tambahkan kelas khusus di sini
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
                                  <span className="icon is-right">
                                    <a href="#" target="_blank" id="kk-link">
                                      <i className="mdi mdi-open-in-app mdi-36px"></i>
                                    </a>
                                  </span>
                                </label>
                                <div className="control">
                                  <input
                                    autoComplete="current-password"
                                    className="input"
                                    name="password_current"
                                    type="file"
                                    value={dataPelaporanById?.scanAkta || ""}
                                  />
                                </div>
                                {/* <p className="help">Required. Your current password</p> */}
                              </div>
                              <div className="field">
                                <label className="label is-flex is-justify-content-space-between">
                                  Surat Dokumen Lain :
                                  <span className="icon is-right">
                                    <a href="#" target="_blank" id="kk-link">
                                      <i className="mdi mdi-open-in-app mdi-36px"></i>
                                    </a>
                                  </span>
                                </label>
                                <div className="control">
                                  <input
                                    autoComplete="current-password"
                                    className="input"
                                    name="password_current"
                                    type="file"
                                    value={
                                      dataPelaporanById?.scanDokumenLain || ""
                                    }
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="field">
                                <label className="label">Tanggal Lahir</label>
                                <div className="control">
                                  <input
                                    placeholder="Tanggal Lahir"
                                    autoComplete="tanggalLahir"
                                    className="input-date"
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
                                    className="textarea textarea-custom" // Tambahkan kelas khusus di sini
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
                                  <span className="icon is-right">
                                    <a href="#" target="_blank" id="kk-link">
                                      <i className="mdi mdi-open-in-app mdi-36px"></i>
                                    </a>
                                  </span>
                                </label>
                                <div className="control">
                                  <input
                                    autoComplete="current-password"
                                    className="input"
                                    name="password_current"
                                    type="file"
                                    value={dataPelaporanById?.scanIjazah || ""}
                                  />
                                </div>
                                {/* <p className="help">Required. Your current password</p> */}
                              </div>
                            </div>
                          </div>
                          <div className="columns">
                            <div className="column">
                              <div className="field">
                                {/* <RequiredLabel children="Kerentanan" /> */}
                                <div className="control">
                                  <textarea
                                    placeholder="Kerentanan"
                                    className="textarea textarea-custom"
                                    value={dataPelaporanById?.kerentanan || ""}
                                    readOnly
                                  ></textarea>
                                </div>
                              </div>
                            </div>
                            <div className="column">
                              <div className="field">
                                {/* <RequiredLabel children="Kebutuhan Khusus" /> */}
                                <div className="control">
                                  <textarea
                                    placeholder="Kebutuhan Khusus"
                                    className="textarea textarea-custom"
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
                      <div className="column is-flex is-align-items-center is-justify-content-center has-text-centered">
                        <div className="field is-horizontal">
                          <div className="field-body mr-3">
                            <div className="field">
                              <div className="control">
                                <button
                                  className="button is-success is-outlined button-custom" // Tambahkan kelas khusus di sini
                                  onClick={handleModalToggleAccept}
                                  type="button"
                                >
                                  <span>Terima laporan</span>
                                  <span className="icon is-small">
                                    <i className="mdi mdi-check"></i>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>

                          {modalOpenAccept && (
                            <div className="modal is-active">
                              <form>
                                <div className="modal-background"></div>
                                <div className="modal-card">
                                  <header className="modal-card-head">
                                    <h4 className="modal-card-title has-text-black">
                                      KIRIM VALIDASI
                                    </h4>
                                    <button
                                      className="delete"
                                      aria-label="close"
                                      type="button"
                                      onClick={handleModalToggleAccept}
                                    ></button>
                                  </header>
                                  <section className="modal-card-body">
                                    <div className="field is-horizontal">
                                      <div className="field-label is-normal">
                                        <label className="label">
                                          Nama Pelapor
                                        </label>
                                      </div>
                                      <div className="field-body">
                                        <div className="field">
                                          <div className="control">
                                            <input
                                              placeholder="Nama Pelapor"
                                              autoComplete="on"
                                              className="input"
                                              name="name"
                                              value={
                                                dataPelaporanById?.namaPelapor ||
                                                ""
                                              }
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
                                          <div className="control">
                                            <input
                                              placeholder="Status"
                                              autoComplete="on"
                                              className="input-status"
                                              name="status"
                                              value="DI TERIMA"
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
                                        <label className="label">Pesan</label>
                                      </div>
                                      <div className="field-body">
                                        <div className="field">
                                          <div className="control">
                                            <textarea
                                              className="textarea textarea-custom"
                                              placeholder="Masukkan alasan"
                                              name="keterangan"
                                              onChange={handleSendNotification}
                                            ></textarea>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </section>
                                  <footer className="modal-card-foot is-flex justify-content-center">
                                    <div className="buttons">
                                      <button
                                        type="button"
                                        className="button-kirimpesan is-success "
                                      >
                                        Kirim Pesan
                                      </button>
                                      <button
                                        onClick={handleModalToggleAccept}
                                        type="button"
                                        className="button-cancel"
                                      >
                                        Cancel
                                      </button>
                                    </div>
                                  </footer>
                                </div>
                              </form>
                            </div>
                          )}
                          <div className="field-body">
                            <div className="field">
                              <div className="control">
                                <button
                                  className="button is-danger is-outlined button-custom-tolak"
                                  onClick={handleModalToggleReject}
                                  type="button"
                                >
                                  <span>Tolak laporan</span>
                                  <span className="icon is-small">
                                    <i className="mdi mdi-close"></i>
                                  </span>
                                </button>
                              </div>
                            </div>
                          </div>
                          {modalOpenReject && (
                            <div className="modal is-active">
                              <div className="modal-background"></div>
                              <div className="modal-card">
                                <header className="modal-card-head">
                                  <p className="modal-card-title">
                                    Modal title
                                  </p>
                                  <button
                                    className="delete"
                                    type="button"
                                    aria-label="close"
                                    onClick={handleModalToggleReject}
                                  ></button>
                                </header>
                                <section className="modal-card-body">
                                  DI TOLAK
                                </section>
                                <footer className="modal-card-foot">
  <div className="buttons">
    <button
      type="button"
      className="button custom-danger-button"
    >
      Save changes
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
                        </div>
                      </div>
                      <hr />

                      <div>
                        <h4 className="has-text-black">
                          <b>
                            <u>DATA PETUGAS PEREKAMAN</u>
                          </b>
                        </h4>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <div className="field">
                            <label className="label">Petugas 1</label>
                            <div className="control">
                              <input
                                autoComplete="current-password"
                                className="input"
                                name="password_current"
                                type="password"
                              />
                            </div>
                            {/* <p className="help">Required. Your current password</p> */}
                          </div>
                        </div>
                        <div className="column">
                          <div className="field">
                            <label className="label">Waktu dan Tanggal</label>
                            <div className="control">
                              <input
                                autoComplete="new-password"
                                className="input-date"
                                name="password_new"
                                type="datetime-local"
                              />
                            </div>
                            {/* <p className="help">Required. Your new password</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column">
                          <div className="field">
                            <label className="label">Petugas 2</label>
                            <div className="control">
                              <input
                                autoComplete="current-password"
                                className="input"
                                name="password_current"
                                type="password"
                              />
                            </div>
                            {/* <p className="help">Required. Your current password</p> */}
                          </div>
                        </div>
                        <div className="column">
                          <div className="field">
                            <label className="label">Hasil Perekaman</label>
                            <div className="control">
                              <input
                                autoComplete="new-password"
                                className="input"
                                name="password_new"
                                type="file"
                              />
                            </div>
                            {/* <p className="help">Required. Your new password</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="columns">
                        <div className="column is-flex is-justify-content-flex-end ">
                          <div className="field">
                            <div className="field-body">
                              <div className="field">
                                <div className="control">
                                  <button
                                    className="button is-link button-custom-simpan" // Tambahkan kelas khusus di sini
                                    type="submit"
                                  >
                                    Simpan Data
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </section>
              {/* FOOTER */}
              {/* <AdminComponent.Footer /> */}
            </div>

            <script src="../../js/main.min.js" type="text/javascript" />
            <link
              href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
              rel="stylesheet"
            />
          </body>
        </html>
      )}
    </div>
  );
};

export default PersonDetail;