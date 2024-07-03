import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/StatusBar.css"

const StatusBar = () => {
  const [jumlahPelaporan, setJumlahPelaporan] = useState(0); 
  const [jumStatusDiAjukan, setJumStatusDiAjukan] = useState(0);
  const [jumStatusDiVerifikasi, setJumStatusDiVerifikasi] = useState(0);
  const [jumStatusDiTolak, setJumStatusDiTolak] = useState(0);
  const [jumStatusSelesai, setJumStatusSelesai] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL; 
  const token = localStorage.getItem('token');
  
  const funcPelaporan = async () => {
    try {
      const response = await axios.get(`${apiUrl}/terlapors`, {
        headers: {
          'token': token
        }
      });
      setJumlahPelaporan(response.data.length);

      const kerentananOptions = response.data.map((item) => item?.Pelaporan?.statusLayanan);
      const countStatus = {};
      kerentananOptions.forEach((status) => {
        countStatus[status] = (countStatus[status] || 0) + 1;
      });

      setJumStatusDiAjukan(countStatus["Di ajukan"] || 0);
      setJumStatusDiVerifikasi(countStatus["Verifikasi"] || 0);
      setJumStatusDiTolak(countStatus["Di tolak"] || 0);
      setJumStatusSelesai(countStatus["Selesai"] || 0);

    } catch (error) {
      console.error("Terjadi kesalahan :", error.message);
    }
  };

  useEffect(() => {
     document.title = 'Admin | Dashboard'; 
     funcPelaporan();
  }, []);
  return (
    <div className="columns">
      <div className="column is-4 ml-2">
        <div className="box" id="BoxStatus1">
          <div className="labels">
            JUMLAH AJUAN : <br />
          </div>
          <div className="value">{jumlahPelaporan}</div>
        </div>
      </div>
      <div className="column is-2">
        <div className="box ajuan" id="BoxStatus2">
          <div className="labels">
            DIAJUKAN <br />
          </div>
          <div className="value">{jumStatusDiAjukan}</div>
        </div>
      </div>
      <div className="column is-2">
        <div className="box ajuan" id="BoxStatus2">
          <div className="labels">
            SELESAI <br />
          </div>
          <div className="value">{jumStatusSelesai}</div>
        </div>
      </div>
      <div className="column is-2">
        <div className="box ajuan" id="BoxStatus2">
          <div className="labels">
            DI VERIFIKASI <br />
          </div>
          <div className="value">{jumStatusDiVerifikasi}</div>
        </div>
      </div>
      <div className="column is-2">
        <div className="box ajuan" id="BoxStatus2">
          <div className="labels">
            DITOLAK <br />
          </div>
          <div className="value">{jumStatusDiTolak}</div>
        </div>
      </div>
    </div>
  )
}

export default StatusBar