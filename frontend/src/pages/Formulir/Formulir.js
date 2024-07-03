import axios from "axios";
import { useNavigate } from "react-router-dom";
import RequiredLabel from "../../components/requiredLabel";
import { Loading } from "../../components/loading/loading";
import ReactSelect from "../../components/reactSelect";
import React, { useEffect, useState, useRef } from "react";
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import "../../styles/Formulir.css"

const Formulir = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    namaPelapor: "",
    nomorWA: "",
    nomorNIK: "",
    hubunganId: "",
    jenisKelaminId: "",
    namaTerlapor: "",
    namaIbuKandung: "",
    namaAyahKandung: "",
    tempatLahir: "",
    tanggalLahir: "",
    alamat: "",
    agree: false,
  });
  const [formFile, setFormFile] = useState({
    scanKK: "",
    scanKTP: "",
    scanIjazah: "",
    scanAkta: "",
    fotoWajah: "",
    scanDokumenLain: "",
  });
  const [kecamatanId, setKecamatanId] = useState("");
  const [kelurahanId, setKelurahanId] = useState("");
  const [kerentananId, setKerentananId] = useState("");
  const [kebutuhanKhususId, setKebutuhanKhususId] = useState("");
  const [hubunganList, setHubunganList] = useState([]);
  const [jenisKelamin, setJenisKelamin] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);
  const [kelByKec, setkelByKec] = useState([]);
  const [kerentananList, setKerentananList] = useState([]);
  const [kebutuhanKhususList, setKebutuhanKhususList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const divRef = useRef(null);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError("");
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

  const fetchData = async () => {
    try {
        const [
            kecamatansResponse,
            kelurahansResponse,
            hubungansResponse,
            kebutuhanKhususResponse,
            kerentanansResponse,
            jenisKelaminResponse
        ] = await Promise.all([
            axios.get(`${apiUrl}/kecamatans`),
            axios.get(`${apiUrl}/kelurahans`),
            axios.get(`${apiUrl}/hubungans`),
            axios.get(`${apiUrl}/keb-khusus`),
            axios.get(`${apiUrl}/kerentanans`),
            axios.get(`${apiUrl}/jenisKelamins`)
        ]);

        // Setting state with fetched data
        setKecamatanList(kecamatansResponse.data);
        setKelurahanList(kelurahansResponse.data);
        setHubunganList(hubungansResponse.data);
        setKebutuhanKhususList(kebutuhanKhususResponse.data);
        setKerentananList(kerentanansResponse.data);
        setJenisKelamin(jenisKelaminResponse.data);
    } catch (error) {
        console.error("Error fetching data : ", error);
    }
};

  useEffect(() => {
    document.title = 'Formulir';
    fetchData();
    // getHubungans();
    // getJenisKelamin();
    // getKebutuhanKhusus();
    // getKerentanans();
    // getKelurahans();
    if (divRef.current) {
      divRef.current.focus();
    }
  }, [divRef]);

  function handlekecamatanId(event) {
    const id = event.target.value;
    setKecamatanId(id);
    const getKelurahanByIdKecamatan = kelurahanList.filter(
      (x) => x.kecamatanId == id
    );
    setkelByKec(getKelurahanByIdKecamatan);
  }
  function handlekelurahanId(event) {
    const selectedId = event.target.value;
    setKelurahanId(selectedId);
  }
  const saveUser = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const combinedFormData = {
      ...formData,
      kelurahanId,
      kerentananId,
      kebutuhanKhususId,
    };
    const readyData = new FormData();
    readyData.append("namaPelapor", combinedFormData.namaPelapor);
    readyData.append("nomorNIK", combinedFormData.nomorNIK);
    readyData.append("nomorWA", combinedFormData.nomorWA);
    readyData.append("hubunganId", combinedFormData.hubunganId);
    readyData.append("jenisKelaminId", combinedFormData.jenisKelaminId);
    readyData.append("namaTerlapor", combinedFormData.namaTerlapor);
    readyData.append("namaAyahKandung", combinedFormData.namaAyahKandung);
    readyData.append("namaIbuKandung", combinedFormData.namaIbuKandung);
    readyData.append("tempatLahir", combinedFormData.tempatLahir);
    readyData.append("tanggalLahir", combinedFormData.tanggalLahir);
    readyData.append("alamat", combinedFormData.alamat);
    readyData.append("scanKK", formFile.scanKK);
    readyData.append("scanKTP", formFile.scanKTP);
    readyData.append("scanIjazah", formFile.scanIjazah);
    readyData.append("scanAkta", formFile.scanAkta);
    readyData.append("scanDokumenLain", formFile.scanDokumenLain);
    readyData.append("fotoWajah", formFile.fotoWajah);
    readyData.append("agree", combinedFormData.agree);
    readyData.append("kelurahanId", combinedFormData.kelurahanId);
    readyData.append("kerentananId", JSON.stringify(kerentananId));
    readyData.append("kebutuhanKhususId", JSON.stringify(kebutuhanKhususId));
    console.log(readyData);
    try {
      await axios
        .post(`${apiUrl}/pelapor`, readyData, {
          headers: {
            "Content-type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response.data.success);
          if (response) {
            setLoading(false);
            setSuccess(response.data.success);
            setTimeout(() => {
              setSuccess("");
              navigate("/");
            }, 3000);
            setTimeout(() => {
              if (divRef.current) {
                divRef.current.focus();
              }
            }, 0);
          }
        })
        .catch((e) => {
          setLoading(false);
          setError(e.response.data.message);
          setTimeout(() => {
            if (divRef.current) {
              divRef.current.focus();
            }
          }, 0);
        });
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  }; 

  const handleSelectChangeKerentanan = (selectedOption) => {
    const DataSelect = selectedOption;
    const values = DataSelect.map((option) => option.value);
    const combinedValue = values.map((value) => ({ value }));
    setKerentananId(combinedValue);
    // console.log("Value kerentanan : ", combinedValue);
  };
  const handleSelectChangeKebKhusus = (selectedOption) => {
    const DataSelect = selectedOption;
    const values = DataSelect.map((option) => option.value);
    const combinedValue = values.map((value) => ({ value }));
    setKebutuhanKhususId(combinedValue);
    // console.log("Value khusus : ", combinedValue);
  };
  const selectKerentanan = kerentananList.map((kerentanan) => ({
    value: kerentanan.id,
    label: kerentanan.namaKerentanan,
  }));
  const selectKebutuhanKhusus = kebutuhanKhususList.map((kebutuhanKhusus) => ({
    value: kebutuhanKhusus.id,
    label: kebutuhanKhusus.namaKebutuhanKhusus,
  }));
  //  ----------------------- UI ------------------------------

  return (
    <div>

      {loading && <Loading />}

      {/* JUDUL FORMULIR */}
      <section className="section has-background-white">
        <div className="section has-text-centered">
          <h1 className="title has-text-black">
            FORMULIR PELAPORAN PENDUDUK RENTAN
          </h1>
        </div>
      </section>

      {/* HEADER */}
      <section class="hero has-background-danger-20">
        <div class="hero-body has-text-light" id="Header">
          <div class="columns-header">
            <div class="column-narrow">
              <figure class="image">
                <img
                  id="Logo"
                  src={require("../../assets/Logo.png")}
                  title="Logo"
                  alt="Logo"
                />
              </figure>
            </div>
            <div class="column">
              <h1 class="judul">
                Dinas Kependudukan dan Pencatatan Sipil <br></br>Kabupaten
                Sukoharjo
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* FORMULIR */}
      <section
        className="section"
        style={{
          backgroundImage: `url(${require("../../assets/images/baground.png")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <form onSubmit={saveUser}>
          <div className="container-body">
            <div className="box" id="Form">
              {/* Notifikasi */}
              {error && (
                <div
                  tabIndex={0}
                  ref={divRef}
                  className="notification is-danger is-centered"
                >
                  <h4>{error}</h4>
                </div>
              )}
              {success && (
                <div
                  tabIndex={0}
                  ref={divRef}
                  className="notification is-success is-centered"
                >
                  <h4>{success}</h4>
                </div>
              )}

              <h4 className="subtitle is-6 has-text-black has-text-weight-bold is-underlined">
                DATA DIRI PELAPOR
              </h4>
              <div className="columns">
                <div className="column is-half">
                  <div className="field">
                    <RequiredLabel className="label has-text-black">Nama Lengkap</RequiredLabel>
                    <div className="control">
                      <input
                        id="Input"
                        className="input"
                        type="text"
                        name="namaPelapor"
                        value={formData.namaPelapor}
                        onChange={handleInputChange}
                        placeholder="Nama Lengkap Pelapor"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="column is-half">
                  <div className="field">
                    <RequiredLabel className="label has-text-black">Nomor WhatsApp</RequiredLabel>
                    <div className="control">
                      <input
                        id="Input"
                        className="input"
                        type="text"
                        name="nomorWA"
                        value={formData.nomorWA}
                        onChange={handleInputChange}
                        placeholder="Example : 08**********"
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-half">
                  <div className="field">
                    <RequiredLabel className="label has-text-black">NIK Pelapor</RequiredLabel>
                    <div className="control">
                      <input
                        id="Input"
                        className="input"
                        type="text"
                        name="nomorNIK"
                        value={formData.nomorNIK}
                        onChange={handleInputChange}
                        placeholder="Nomor NIK Pelapor"
                        pattern="[0-9]*"
                        maxLength={16}
                        title="Harap hanya memasukkan angka"
                      ></input>
                    </div>
                  </div>
                </div>
                <div className="column  is-half">
                  <div className="field">
                    <RequiredLabel className="label has-text-black">
                      Hubungan dengan Terlapor
                    </RequiredLabel>
                    <div className="control is-expanded">
                      <div className="select is-fullwidth">
                        <select
                          id="Input"
                          name="hubunganId"
                          value={formData.hubunganId}
                          onChange={handleInputChange}
                          className="select-custom"
                        >
                          <option value="">Pilih Hubungan. . .</option>
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
              </div>
              <h4 className="subtitle is-6 has-text-black has-text-weight-bold is-underlined">
                DATA DIRI TERLAPOR
              </h4>
              <div className="columns">
                <div className="column is-half">
                  <div className="columns">
                    <div className="column is-half">
                      <div className="field">
                        <RequiredLabel className="label has-text-black">Nama Lengkap</RequiredLabel>
                        <div className="control">
                          <input
                            id="Input"
                            className="input"
                            type="text"
                            name="namaTerlapor"
                            value={formData.namaTerlapor}
                            onChange={handleInputChange}
                            placeholder="Nama Lengkap Terlapor"
                          ></input>
                        </div>
                      </div>
                    </div>
                    <div className="column is-half">
                      <div className="field">
                        <RequiredLabel className="label has-text-black">Jenis Kelamin</RequiredLabel>
                        <div className="control is-expanded">
                          <div className="select is-fullwidth">
                            <select
                              id="Input"
                              name="jenisKelaminId"
                              value={formData.jenisKelaminId}
                              onChange={handleInputChange}
                              className="select-custom"
                            >
                              <option value={""}>Pilih Jenis Kelamin</option>
                              {jenisKelamin.map((jenisKelamin, index) => (
                                <option
                                  key={index}
                                  value={jenisKelamin.id}
                                >
                                  {jenisKelamin.jenisKelamin}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                <div className="column is-half">
                  <div className="columns">
                    <div className="column is-half">
                      <div className="field">
                        <RequiredLabel className="label has-text-black">Kecamatan</RequiredLabel>
                        <div className="control is-expanded">
                          <div className="select is-fullwidth">
                            <select
                              id="Input"
                              name="kecamatanId"
                              value={kecamatanId}
                              onChange={handlekecamatanId}
                              className="select-custom"
                            >
                              <option value={""}>Pilih Kecamatan</option>
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
                    </div>
                    <div className="column is-half">
                      <div className="field">
                        <RequiredLabel className="label has-text-black">Kelurahan</RequiredLabel>
                        <div className="control is-expanded">
                          <div className="select is-fullwidth">
                            <select
                              id="Input"
                              name="kelurahanId"
                              value={kelurahanId}
                              onChange={handlekelurahanId}
                              className="select-custom"
                            >
                              <option>Pilih Kelurahan</option>
                              {kelByKec.map((ctr, index) => (
                                <option key={index} value={ctr.id}>
                                  {ctr.namaKelurahan}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-half field">
                  <div className="columns is-half is-multiline field is-centered">
                    <div className="column is-half field">
                      <RequiredLabel className="label">
                        Ibu Kandung
                      </RequiredLabel>
                      <div className="control is-expanded">
                        <input
                          id="Input"
                          type="text"
                          name="namaIbuKandung"
                          className="input"
                          value={formData.namaIbuKandung}
                          onChange={handleInputChange}
                          placeholder="Ibu Kandung"
                        />
                      </div>
                    </div>
                    <div className="column is-half field">
                      <RequiredLabel className="label">
                        Ayah Kandung
                      </RequiredLabel>
                      <div className="control">
                        <input
                          id="Input"
                          type="text"
                          name="namaAyahKandung"
                          className="input"
                          value={formData.namaAyahKandung}
                          onChange={handleInputChange}
                          placeholder="Ayah Kandung"
                        />
                      </div>
                    </div>
                    <div className="column is-half field">
                      <RequiredLabel className="label">
                        Tempat Lahir
                      </RequiredLabel>
                      <div className="control">
                        <input
                          id="Input"
                          type="text"
                          name="tempatLahir"
                          className="input"
                          value={formData.tempatLahir}
                          onChange={handleInputChange}
                          placeholder="Tempat Lahir"
                        />
                      </div>
                    </div>
                    <div className="column is-half field">
                      <RequiredLabel className="label">
                        Tanggal Lahir
                      </RequiredLabel>
                      <div className="control">
                        <input
                          id="Input"
                          type="date"
                          name="tanggalLahir"
                          className="input"
                          value={formData.tanggalLahir}
                          onChange={handleInputChange}
                          placeholder="Tanggal Lahir"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="column is-half field">
                  <RequiredLabel className="label">
                    Alamat Lengkap
                  </RequiredLabel>
                  <div className="control">
                    <textarea
                      id="Input"
                      name="alamat"
                      className="textarea textarea-custom"
                      value={formData.alamat}
                      onChange={handleInputChange}
                      placeholder="Tuliskan alamat lengkap"
                      rows="5"

                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-half field">
                  <label className="label has-text-black">Scan Kartu Keluarga (KK)</label>
                  <div className="control">
                    <input
                      id="Input"
                      type="file"
                      name="scanKK"
                      className="input"
                      onChange={handleInputFile}
                      placeholder="Scan Kartu Keluarga"
                    />
                  </div>
                </div>
                <div className="column is-half field">
                  <label className="label has-text-black">Scan Ijazah</label>
                  <div className="control">
                    <input
                      id="Input"
                      type="file"
                      name="scanIjazah"
                      className="input"
                      onChange={handleInputFile}
                      placeholder="Scan Ijazah"
                    />
                  </div>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-half field">
                  <label className="label has-text-black">Scan KTP</label>
                  <div className="control">
                    <input
                      id="Input"
                      type="file"
                      name="scanKTP"
                      className="input"
                      onChange={handleInputFile}
                      placeholder="Scan KTP"
                    />
                  </div>
                </div>
                <div className="column is-half field">
                  <label className="label has-text-black">Scan Akta Kelahiran</label>
                  <div className="control">
                    <input
                      id="Input"
                      type="file"
                      name="scanAkta"
                      className="input"
                      onChange={handleInputFile}
                      placeholder="Scan Akta Kelahiran"
                    />
                  </div>
                </div>
              </div>
              <div className="columns">
                <div className="column is-6 field">
                  <RequiredLabel className="label has-text-black">Foto Wajah</RequiredLabel>
                  <div className="control">
                    <input
                      id="Input"
                      type="file"
                      name="fotoWajah"
                      className="input"
                      onChange={handleInputFile}
                      placeholder="Foto Wajah"
                    />
                  </div>
                </div>
                <div className="column is-6 field">
                  <label className="label has-text-black">Dokumen Lain</label>
                  <div className="control">
                    <input
                      id="Input"
                      type="file"
                      name="scanDokumenLain"
                      className="input"
                      onChange={handleInputFile}
                      placeholder="Foto Wajah"
                    />
                  </div>
                </div>
              </div>
              <div className="columns is-centered">
                <div className="column is-half field">
                  <RequiredLabel className="label">
                    Status Kerentanan
                  </RequiredLabel>
                  <div className="is-5">
                    <ReactSelect
                      id="Input"
                      name={"kerentananId"}
                      value={kerentananId.value}
                      options={selectKerentanan}
                      onChange={handleSelectChangeKerentanan}
                      className="red-outline" // Apply the custom CSS class here
                    />
                  </div>
                </div>
                <div className="column is-half field">
                  <label className="label">
                    Jenis Kebutuhan Khusus
                  </label>
                  <div className="">
                    <ReactSelect
                      id="Input"
                      name={"kebutuhanKhususId"}
                      value={kebutuhanKhususId.value}
                      options={selectKebutuhanKhusus}
                      onChange={handleSelectChangeKebKhusus}
                      className="red-outline"
                    />
                    <p className="help is-danger justify-start">Pilih bagi yang berkebutuhan khusus.</p>
                  </div>
                </div>
              </div>
              <div className="columns mb-5 field is-centered" id="Checkbox">
                <label className="checkbox has-text-black">
                  <input
                    id="Input"
                    name="agree"
                    checked={formData.agree}
                    className="checkbox mr-2"
                    type="checkbox"
                    onChange={(e) =>
                      setFormData({ ...formData, agree: e.target.checked })
                    }
                  />
                  Data yang saya isi sudah benar
                </label>
              </div>
              <div className="columns mb-5 field is-centered" id="Checkbox">
                <button
                  type="submit"
                  className="button has-background-danger-20 has-text-light"
                >
                  <span className="icon is-medium">
                    <SendOutlinedIcon />
                  </span>
                  <span>Kirim Laporan</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>

      {/* FOOTER */}
      <section className="section has-background-danger-20">
        <div className="section" id="Footer">
          <div className="columns-footer">
            <div className="column is-one-third">
              <figure className="image">
                <img
                  id="Logo-Footer"
                  src={require("../../assets/Logo.png")}
                  title="Logo"
                  alt="Logo"
                />
              </figure>
            </div>
            <div className="column is-two-thirds">
              <h1 className="judul-footer is-2 has-text-light">
                Dinas Kependudukan dan Pencatatan Sipil Kabupaten Sukoharjo
                <br></br>
                <br></br>
              </h1>
              <p className="judul-footer is-6 has-text-light">
                Alamat: Jalan Kyai Mawardi No. 1 <br></br>
                Sukoharjo,Kode Pos. 57521<br></br>
                <br></br>
                Telp: (0271) 593178 Fax. (0271) 593178,<br></br>
                WA Layanan Pengaduan 081232457713<br></br>
                <br></br>
                Email: dispendukcapil@sukoharjokab.go.id
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Formulir;
