import React, { useState, useEffect } from "react";
import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";
import axios from "axios";
import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import withAuth from '../../utils/AuthLogin'
import "../../styles/BoxContent.css"

const DataStatistik = () => {
  const [kelurahanList, setKelurahanList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelByYear, setKelByYear] = useState([]);
  const [kelByKec, setkelByKec] = useState([]);
  const [kerentananList, setKerentananList] = useState([]);
  const [kebutuhanKhususList, setKebutuhanKhususList] = useState([]);
  const currentYear = new Date().getFullYear();
  const [getId, setId] = useState({
    yearId: `${currentYear}`,
    kecamatanId: '',
    kerentananId: ''
  });
  const [jumKerentanan, setJumKerentanan] = useState({
    lansia: '',
    odgj: '',
    disabilitas: ''
  });
  const [dataPelaporan, setDataPelaporan] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [jumStatusDiAjukan, setJumStatusDiAjukan] = useState(0);
  const [jumStatusDiVerifikasi, setJumStatusDiVerifikasi] = useState(0);
  const [jumStatusDiTolak, setJumStatusDiTolak] = useState(0);
  const [jumStatusSelesai, setJumStatusSelesai] = useState(0);
  const [total, setTotal] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
 const token = localStorage.getItem('token');

  const funcPelaporan = async () => {
    try {
      const response = await axios.get(`${apiUrl}/terlapors`, {
        headers: {
          'token': token
        }
      });
      const kerentananOptions = response.data.map((item) => item?.Pelaporan?.statusLayanan);
      setDataPelaporan(response.data);
      setTotal(response.data.length);
      const countStatus = {};
      kerentananOptions.forEach((status) => {
        countStatus[status] = (countStatus[status] || 0) + 1;
      });

      setJumStatusDiAjukan(countStatus["Di ajukan"] || 0);
      setJumStatusDiVerifikasi(countStatus["Verifikasi"] || 0);
      setJumStatusDiTolak(countStatus["Di tolak"] || 0);
      setJumStatusSelesai(countStatus["Selesai"] || 0);
      // setLoading(false);
    } catch (error) {
      console.error("Terjadi kesalahan :", error.message);
      // setLoading(false);
    }
  };

  const fetchData = async () => {
    try {
        const [
            kecamatansResponse,
            kelurahansResponse,
            kebutuhanKhususResponse,
            kerentanansResponse
        ] = await Promise.all([
            axios.get(`${apiUrl}/kecamatans`),
            axios.get(`${apiUrl}/kelurahans`),
            axios.get(`${apiUrl}/keb-khusus`),
            axios.get(`${apiUrl}/kerentanans`)
        ]);

        setKecamatanList(kecamatansResponse.data);
        setKelurahanList(kelurahansResponse.data);
        setKebutuhanKhususList(kebutuhanKhususResponse.data);
        setKerentananList(kerentanansResponse.data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

  useEffect(() => {
    document.title = 'Admin | Statistics';
    funcPelaporan();
    fetchData(); 
  }, []);

  useEffect(() => {
    const processedData = kecamatanList.map(kecamatan => {
      let jumlahLansia = 0;
      let jumlahODGJ = 0;
      let jumlahDisabilitas = 0;

      kecamatan.Kelurahans.forEach(kelurahan => {
        kelurahan.Terlapors.filter((terlapor) => {
          const pelaporanYear = new Date(terlapor.Pelaporan.tanggalPelaporan).getFullYear();
          return pelaporanYear == currentYear;
        }).forEach(terlapor => {
          jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
          jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
          jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
        });
      });

      return {
        valuexAxis: kecamatan.namaKecamatan,
        jumlahLansia,
        jumlahODGJ,
        jumlahDisabilitas,
      };
    });

    setkelByKec(processedData);
  }, [kecamatanList]);
 
  function handlekecamatanId(event) {
    const id = event.target.value;
    const selectedKecamatan = kecamatanList.find(kecamatan => kecamatan.kodeWilayahKec == id);
    if (getId.yearId == "all") {
      console.log('Id year : all - ', id);
      const processedData = selectedKecamatan.Kelurahans.map(kelurahan => {
        let jumlahLansia = 0;
        let jumlahODGJ = 0;
        let jumlahDisabilitas = 0;

        kelurahan.Terlapors.forEach(terlapor => {
          jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
          jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
          jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
        });

        return {
          valuexAxis: kelurahan.namaKelurahan,
          jumlahLansia,
          jumlahODGJ,
          jumlahDisabilitas,
        };
      });
      setId({
        yearId: getId.yearId,
        kecamatanId: id,
      });
      return setkelByKec(processedData);
    } else if (id == "") {
      // console.log('Id kecamatan : kosong - ', getId.kecamatanId);
      setId({
        yearId: getId.yearId,
        kecamatanId: id,
      });
      const processedData = kecamatanList.map(kecamatan => {
        let jumlahLansia = 0;
        let jumlahODGJ = 0;
        let jumlahDisabilitas = 0;

        kecamatan.Kelurahans.forEach(kelurahan => {
          kelurahan.Terlapors.filter((terlapor) => {
            const pelaporanYear = new Date(terlapor.Pelaporan.tanggalPelaporan).getFullYear();
            return pelaporanYear == parseInt(getId.yearId);
          }).forEach(terlapor => {
            jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
            jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
            jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
          });
        });

        return {
          valuexAxis: kecamatan.namaKecamatan,
          jumlahLansia,
          jumlahODGJ,
          jumlahDisabilitas,
        };
      });
      return setkelByKec(processedData);
    } else {
      // console.log('Id kecamatan : ada - ', id);
      const processedData = selectedKecamatan.Kelurahans.map(kelurahan => {
        let jumlahLansia = 0;
        let jumlahODGJ = 0;
        let jumlahDisabilitas = 0;

        kelurahan.Terlapors.filter(terlapor => {
          const pelaporanYear = new Date(terlapor.Pelaporan.tanggalPelaporan).getFullYear();
          return pelaporanYear === parseInt(getId.yearId);
        }).forEach(terlapor => {
          jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
          jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
          jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
        });

        return {
          valuexAxis: kelurahan.namaKelurahan,
          jumlahLansia,
          jumlahODGJ,
          jumlahDisabilitas,
        };
      });
      setId({
        yearId: getId.yearId,
        kecamatanId: id,
      });
      return setkelByKec(processedData);
    }
  }

  const handleYearFilterForLaporan = (e) => {
    const year = e.target.value;
    if (year == "") {
      return funcPelaporan();
    } else {
      const filtered = dataPelaporan.filter(item => {
        const pelaporanYear = new Date(item?.Pelaporan?.tanggalPelaporan).getFullYear();
        return pelaporanYear === parseInt(year);
      });
      const kerentananOptions = filtered.map((item) => item?.Pelaporan?.statusLayanan);
      setTotal(filtered.length);
      const countStatus = {};
      kerentananOptions.forEach((status) => {
        countStatus[status] = (countStatus[status] || 0) + 1;
      });

      setJumStatusDiAjukan(countStatus["Di ajukan"] || 0);
      setJumStatusDiVerifikasi(countStatus["Verifikasi"] || 0);
      setJumStatusDiTolak(countStatus["Di tolak"] || 0);
      setJumStatusSelesai(countStatus["Selesai"] || 0);
    }
  }

  const handleYearFilterForKerentanan = (e) => {
    const year = e.target.value;
    setId({ yearId: year, kecamatanId: '', kerentananId: '' });
    if (year == "all") {
      const processedData = kecamatanList.map(kecamatan => {
        let jumlahLansia = 0;
        let jumlahODGJ = 0;
        let jumlahDisabilitas = 0;

        kecamatan.Kelurahans.forEach(kelurahan => {
          kelurahan.Terlapors.forEach(terlapor => {
            jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
            jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
            jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
          });
        });
        return {
          valuexAxis: kecamatan.namaKecamatan,
          jumlahLansia,
          jumlahODGJ,
          jumlahDisabilitas,
        };
      });
      return setkelByKec(processedData);

    } else {
      const processedData = kecamatanList.map(kecamatan => {
        let jumlahLansia = 0;
        let jumlahODGJ = 0;
        let jumlahDisabilitas = 0;

        kecamatan.Kelurahans.forEach(kelurahan => {
          kelurahan.Terlapors.filter((terlapor) => {
            const pelaporanYear = new Date(terlapor.Pelaporan.tanggalPelaporan).getFullYear();
            return pelaporanYear == parseInt(year);
          }).forEach(terlapor => {
            jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
            jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
            jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
          });
        });

        return {
          valuexAxis: kecamatan.namaKecamatan,
          jumlahLansia,
          jumlahODGJ,
          jumlahDisabilitas,
        };
      });

      return setkelByKec(processedData);
    }
  }

  const handleClear = () => {
    setId({ yearId: `${currentYear}`, kecamatanId: '', kerentananId: '' });
    const processedData = kecamatanList.map(kecamatan => {
      let jumlahLansia = 0;
      let jumlahODGJ = 0;
      let jumlahDisabilitas = 0;

      kecamatan.Kelurahans.forEach(kelurahan => {
        kelurahan.Terlapors.filter((terlapor) => {
          const pelaporanYear = new Date(terlapor.Pelaporan.tanggalPelaporan).getFullYear();
          return pelaporanYear == currentYear;
        }).forEach(terlapor => {
          jumlahLansia += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 1).length;
          jumlahODGJ += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 2).length;
          jumlahDisabilitas += terlapor.TerlaporRentans.filter(tr => tr.kerentananId === 3).length;
        });
      });

      return {
        valuexAxis: kecamatan.namaKecamatan,
        jumlahLansia,
        jumlahODGJ,
        jumlahDisabilitas,
      };
    });

    setkelByKec(processedData);
  }
 
  const chartSetting = {
    yAxis: [
      {
        label: 'Jumlah Data',
      },
    ],
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: 'translate(-10px, 0)',
      },
    },
  };
  const valueFormatter = (value) => `${value} data`;

  return (
    <div className="app">
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon mr-3" >
              <FeedOutlinedIcon />
            </span>
            Data Laporan  
          </p>
          <div class="control has-icons-left is-flex is-justify-content-flex-end mt-1 mr-3">
            <div class="select is-focused">
              <select
                name="yearFilter"
                onChange={handleYearFilterForLaporan}
              >
                <option value="">Pilih tahun...</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
            <div class="icon is-left">
              <CalendarMonthIcon />
            </div>
          </div>
        </header>
        <div className="card-content">
          <div className="columns">
            <div className="column">
              <PieChart
                series={[
                  {
                    data: [
                      { id: 0, value: jumStatusDiAjukan, label: `Di Ajukan` },
                      { id: 1, value: jumStatusDiVerifikasi, label: `Di Verifikasi` },
                      { id: 2, value: jumStatusDiTolak, label: ` Di Tolak` },
                      { id: 3, value: jumStatusSelesai, label: `Selesai` },
                    ],
                  },
                ]}
                width={400}
                height={200}
              />
              <div style={{ textAlign: "center", marginTop: "10px", marginRight: "90px", fontWeight: "bold" }}>
              TOTAL LAPORAN : {total}</div>
            </div>
            <div className="column">
              {/* TAMBAHAN DARI ZIDAN */}
              <div className="column is-2">
                <div className="box ajuan" id="BoxStatus3">
                  <div className="labels">
                    DIAJUKAN <br />
                  </div>
                  <div className="value">{jumStatusDiAjukan}</div>
                </div>
              </div>
              <div className="column is-2">
                <div className="box ajuan" id="BoxStatus3">
                  <div className="labels">
                    SELESAI <br />
                  </div>
                  <div className="value">{jumStatusSelesai}</div>
                </div>
              </div>
            </div>

            <div className="column">
              <div className="column is-2">
                <div className="box ajuan" id="BoxStatus3">
                  <div className="labels">
                    DI VERIFIKASI <br />
                  </div>
                  <div className="value">{jumStatusDiVerifikasi}</div>
                </div>
              </div>
              <div className="column is-2">
                <div className="box ajuan" id="BoxStatus3">
                  <div className="labels">
                    DITOLAK <br />
                  </div>
                  <div className="value">{jumStatusDiTolak}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <header className="card-header">
          <p className="card-header-title">
            <span className="icon mr-3">
              <FeedOutlinedIcon />
            </span>
            Data Kerentanan
          </p>
        </header>
        <div className="card-content">
          <div className="columns">
            <form onSubmit={''}>
              <div className="column is-flex">
                <div className="select mr-2">
                  <select
                    name="yearId"
                    value={getId.yearId}
                    onChange={handleYearFilterForKerentanan}
                  >
                    <option value="2024">2024</option>
                    <option value="2025">2025</option>
                    <option value="2026">2026</option>
                    <option value="2027">2027</option>
                    <option value="2028">2028</option>
                    <option value="2029">2029</option>
                    <option value="all">All data</option>
                  </select>
                </div>
                <div className="select mr-2">
                  <select
                    name="kecamatanId"
                    value={getId.kecamatanId}
                    onChange={handlekecamatanId}
                  >
                    <option value="">Pilih kecamatan...</option>
                    {kecamatanList.map((kecamatan, index) => (
                      <option
                        key={index}
                        value={kecamatan.kodeWilayahKec}
                      >
                        Kec. {kecamatan.namaKecamatan}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="button is-danger is-active has-text-white" type="button" onClick={handleClear}>
                  <span className="icon is-small">
                    <FilterAltOffOutlinedIcon />
                  </span>
                  <span>Clear</span>
                </button>
              </div>
            </form>
          </div>
          <div className="box p-5">
            <div className="is-expanded" style={{ width: '100%' }}>
              <BarChart
                dataset={kelByKec}
                xAxis={[{
                  scaleType: 'band', dataKey: 'valuexAxis', tickLabelStyle: {
                    transform: 'rotate(18deg)', 
                    textAnchor: 'start',  
                    whiteSpace: 'break-spaces', 
                    dy: 10,  
                    dx: 10, 
                  },
                }]}
                series={[
                  { dataKey: 'jumlahLansia', label: 'Lansia', valueFormatter, color: '#2e96ff' },
                  { dataKey: 'jumlahODGJ', label: 'ODGJ', valueFormatter, color: '#b800d8' },
                  { dataKey: 'jumlahDisabilitas', label: 'Disabilitas', valueFormatter, color: '#60009b' },
                ]}
                // barLabel="value"
                {...chartSetting}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Statistik = () => {
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
        <Header nama="Statistik"/>
        <div className="section is-main-section" id="SectionContent">
            <div className="box" id="BoxContent">
              {/* STATISTIK */}
              <DataStatistik />
        </div>
        </div>
        
        </div>
        </div>
    
    </section>
  );
};


export default withAuth(Statistik);
