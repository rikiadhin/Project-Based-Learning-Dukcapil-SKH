import React from 'react';
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Button } from 'primereact/button';
// import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
// import 'primereact/resources/themes/saga-blue/theme.css';  // Theme
// import 'primereact/resources/primereact.css';               // Core CSS
// import 'primeicons/primeicons.css';                         // Icons
import '../../assets/css/ViewPerson.css';                   // Custom styles

const dataHeader = [
    { label: 'Nomor PPDVL', value: 'VER.23.001.000003', highlight: true },
    { label: 'Membutuhkan Draft?', value: 'Dengan draft' },
    { label: 'Cetak oleh Eksportir?', value: 'Ya' },
    { label: 'Nomor Blanko', value: 'TRIC.0A.00003', highlight: true },
];

const invoiceData = [
    { label: 'Nomor Invoice', value: 'INV341821123' },
    { label: 'Tanggal Invoice', value: '06 February 2023' },
    { label: 'Pelabuhan Muat', value: 'IDABU - Atambua' },
    { label: 'Negara Tujuan', value: 'BE - BELGIUM (FLEGT)' },
    { label: 'Pelabuhan Bongkar', value: 'BEABO - Averobode' },
    { label: 'Sarana Transportasi', value: 'KAPAL LAUT (BY SEA)' },
    { label: 'Marks Baris 1', value: 'MARKS 1' },
    { label: 'Marks Baris 2', value: 'MARKS 2' },
];

const importirData = [
    { label: 'Importir', value: 'IMPORTIR A' },
    { label: 'Negara Importir', value: 'BE - BELGIUM' },
    { label: 'Alamat Importir', value: 'VEL ALIAS VOLUPTATEM' },
    { label: 'Lokasi Stuffing', value: 'JALAN SIMULASI 01 DESA SIMULASI 01, KECAMATAN SIMULASI 01, KABUPATEN SIMULASI 01, PROVISI SIMULASI 01' },
    { label: 'Tanggal Stuffing', value: '-' },
];

const eksportirData = [
    { label: 'Nama Eksportir', value: 'SIMULASI 01' },
    { label: 'Jenis Eksportir', value: 'IU-PRIMER SEKUNDER' },
    { label: 'Penanggung Jawab', value: 'Staf Ekspor' },
    { label: 'NPWP', value: '111111111111111' },
    { label: 'No. SLK', value: 'TRIC-IDN-TL-001' },
    { label: 'Alamat', value: 'Jalan Simulasi 01 Desa Simulasi 01, Kecamatan Simulasi 01, Kabupaten Simulasi 01, Provinsi Simulasi 01' },
];

function ViewPerson() {
    const columnStyle = { color: 'black', padding: '8px' };
    const tableStyle = { minWidth: '50rem' }; // Removed overflow: hidden
    const containerStyle = { padding: '24px 40px' }; // Adjusted padding for more space

    return (
        <Box sx={containerStyle}>
            <div>  
          <head>
            <meta charSet="utf-8" />
            <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
            <meta
              content="width=device-width, initial-scale=1"
              name="viewport"
            />
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css2?family=Roboto:ital@0;1&display=swap"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Nunito"
              rel="stylesheet"
              type="text/css"
            />
          </head>
          <body>
            <div id="app">
              {/* NAVBARR 
              <AdminComponent.NavBar name={'halo'} />

              {/* SIDEBAR  */}
              {/* <AdminComponent.SideBar /> */}

              {/* BREADCRUMBS */}
              {/* <AdminComponent.BreadCrumbs /> */}

              {/* DASHBOARD */}
              {/* <AdminComponent.DivNamePage /> */}

              {/* DATA  */}
              
                <div className="card">
                  
                  <div className="card-content">
                    <b>DATA LAPORAN</b>
                    <div className="table-container">
                      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                          <tr>
                            <th className='is-dark'>Nomor</th>
                            <th className='is-dark'>Data Laporan</th>
                            <th className='is-dark'>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>1</th>
                            <td>Kode Pelaporan</td>
                            {/* <td>{dataPelaporanById.kodePelaporan}</td> */}
                          </tr>
                          <tr>
                            <th>2</th>
                            <td>Waktu laporan masuk</td>
                            {/* <td>{dataPelaporanById.tanggalPelaporan}</td> */}
                          </tr>
                          <tr>
                            <th>3</th>
                            <td>Status laporan</td>
                            {/* <td>{dataPelaporanById.statusLayanan}</td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <b>DATA PELAPOR</b>
                    <div className="table-container">
                      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                          <tr>
                            <th className='is-dark'>Nomor</th>
                            <th className='is-dark'>Data Terlapor</th>
                            <th className='is-dark'>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>1</th>
                            <td>Nama Pelapor</td>
                            {/* <td>{dataPelaporanById.namaPelapor}</td> */}
                          </tr>
                          <tr>
                            <th>2</th>
                            <td>Nomor NIK</td>
                            {/* <td>{dataPelaporanById.nomorNIK}</td> */}
                          </tr>
                          <tr>
                            <th>3</th>
                            <td>Nomor WhatsApp</td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.nomorWA} */}
                                </div>
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => window.open(`https://wa.me/62${dataPelaporanById?.nomorWA?.substring(
                                    1
                                  )}`)}>
                                    <i className="mdi mdi-whatsapp mdi-24px "></i>
                                  </span> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>4</th>
                            {/* <td>Hubungan dengan terlapor</td>
                            <td>{dataPelaporanById.statusHubungan}</td> */}
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <b>DATA TERLAPOR</b>
                    <div className="table-container">
                      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                        <thead>
                          <tr>
                            <th className='is-dark'>Nomor</th>
                            <th className='is-dark'>Data Terlapor</th>
                            <th className='is-dark'>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>1</th>
                            <td>Foto Wajah</td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.fotoWajah} */}
                                </div>
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => openModal('modalFotoWajah')}>
                                    <i className="mdi mdi-open-in-app mdi-24px "></i>
                                  </span> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>2</th>
                            <td>Nama Terlapor</td>
                            {/* <td>{dataPelaporanById.namaTerlapor}</td> */}
                          </tr>
                          <tr>
                            <th>3</th>
                            <td>Tempat, Tanggal Lahir</td>
                            {/* <td>{dataPelaporanById.tempatLahir}, {dataPelaporanById.tanggalLahir}</td> */}
                          </tr>
                          <tr>
                            <th>4</th>
                            {/* <td>Nama Ayah Kandung</td>
                            <td>{dataPelaporanById.namaAyahKandung}</td> */}
                          </tr>
                          <tr>
                            <th>5</th>
                            <td>Nama Ibu Kandung</td>
                            {/* <td>{dataPelaporanById.namaIbuKandung}</td> */}
                          </tr>
                          <tr>
                            <th>6</th>
                            {/* <td>Alamat lengkap</td>
                            <td>{dataPelaporanById.alamat}</td> */}
                          </tr>
                          <tr>
                            <th>7</th>
                            <td>Kelurahan, Kecamatan</td>
                            {/* <td>{dataPelaporanById.namaKelurahan}, {dataPelaporanById.namaKecamatan}</td> */}
                          </tr>
                          <tr>
                            <th>8</th>
                            <td>Kerentanan</td>
                            {/* <td>{dataPelaporanById.kerentanan}</td> */}
                          </tr>
                          <tr>
                            <th>9</th>
                            {/* <td>Kebutuhan Khusus</td>
                            <td>{!dataPelaporanById.kebutuhanKhusus ? 'Tidak berkebutuhan khusus' : dataPelaporanById.kebutuhanKhusus}</td> */}
                          </tr>
                          <tr>
                            <th>10</th>
                            <td>Scan Kartu Keluarga (KK) </td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.scanKK == 'scanKK_undefined' ? "-" : dataPelaporanById.scanKK} */}
                                </div>
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => openModal('modalKK')}>
                                    <i className="mdi mdi-open-in-app mdi-24px "></i>
                                  </span> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>11</th>
                            <td>Scan Kartu Tanda Penduduk (KTP)</td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.scanKTP == 'scanKTP_undefined' ? "-" : dataPelaporanById.scanKTP} */}
                                </div>
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => openModal('modalKTP')}>
                                    <i className="mdi mdi-open-in-app mdi-24px "></i>
                                  </span> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>12</th>
                            <td>Scan Ijazah</td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.scanIjazah == 'scanIjazah_undefined' ? "-" : dataPelaporanById.scanIjazah} */}
                                </div>
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => openModal('modalIjazah')}>
                                    <i className="mdi mdi-open-in-app mdi-24px "></i>
                                  </span> */}
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>13</th>
                            <td>Scan Akta Kelahiran</td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.scanAkta == 'scanAkta_undefined' ? "-" : dataPelaporanById.scanAkta}
                                </div> */}
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => openModal('modalAkta')}>
                                    <i className="mdi mdi-open-in-app mdi-24px "></i>
                                  </span> */}
                                  </div>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th>14</th>
                            <td>Scan Dokumen Pendukung</td>
                            <td>
                              <div className="level">
                                <div className="level-left">
                                  {/* {dataPelaporanById.scanDokumenLain == 'scanDokumenLain_undefined' ? "-" : dataPelaporanById.scanDokumenLain} */}
                                </div>
                                <div className="level-right">
                                  {/* <span className="icon button is-success" onClick={() => openModal('modalDokumenLain')}>
                                    <i className="mdi mdi-open-in-app mdi-24px "></i>
                                  </span> */}
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
                                // onClick={handleModalToggleReject}
                                type="button"
                              >
                                <span className="icon is-small">
                                  <i className="mdi mdi-message-text-outline"></i>
                                </span>
                                <span>Verifikasi laporan</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              
              {/* FOOTER */}
              {/* <AdminComponent.Footer /> */}
            </div>
            <script src="../../js/main.min.js" type="text/javascript" />
            <link
              href="https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css"
              rel="stylesheet"
            />
          </body>
        
      

      {/* {modalState.modalFotoWajah && (
        <ModalFile.ModalImageOnly 
          src={`http://localhost:8000/uploads/fotoWajah/${dataPelaporanById.fotoWajah}`}
          alt="Foto Wajah"
          onClose={() => closeModal('modalFotoWajah')}
        />
      )} 
      {modalState.modalKK && (
        <ModalFile.ModalImageScan
          src={`http://localhost:8000/uploads/scanKK/${dataPelaporanById.scanKK}`}
          alt="Kartu Keluarga"
          onClose={() => closeModal('modalKK')}
        />
      )}
      {modalState.modalAkta && (
        <ModalFile.ModalImageScan
          src={`http://localhost:8000/uploads/scanAkta/${dataPelaporanById.scanAkta}`}
          alt="Akta Kelahiran"
          onClose={() => closeModal('modalAkta')}
        />
      )}
      {modalState.modalIjazah && (
        <ModalFile.ModalImageScan
          src={`http://localhost:8000/uploads/scanIjazah/${dataPelaporanById.scanIjazah}`}
          alt="Ijazah"
          onClose={() => closeModal('modalIjazah')}
        />
      )}
      {modalState.modalKTP && (
        <ModalFile.ModalImageScan
          src={`http://localhost:8000/uploads/scanKTP/${dataPelaporanById.scanKTP}`}
          alt="Kartu Tanda Penduduk"
          onClose={() => closeModal('modalKTP')}
        />
      )}
      {modalState.modalDokumenLain && (
        <ModalFile.ModalImageScan
          src={`http://localhost:8000/uploads/scanDocLain/${dataPelaporanById.scanDokumenLain}`}
          alt="Dokumen Pendukung"
          onClose={() => closeModal('modalDokumenLain')}
        />
      )} */}

    </div>

            
        </Box>
    );
}

export default ViewPerson;