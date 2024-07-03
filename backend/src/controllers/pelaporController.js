const models = require("../../models/index");
const axios = require("axios");
const path = require("path"); 

const getAllPelapor = async (req, res) => {
	try {
		const response = await models.Pelapor.findAll();
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json(error);
	}
};

const getPelaporById = async (req, res) => {
	try {
		const response = await models.Pelapor.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
	}
};

let dataError;
const createPelapor = async (req, res) => {
	if (!req.files) {
		return res.status(400).json({ message: "Tidak ada file yang di upload." });
	}  

	const filesToUpload = [
		req.files.scanKK,
		req.files.scanAkta,
		req.files.scanKTP,
		req.files.scanIjazah,
		req.files.scanDokumenLain,
		req.files.fotoWajah,
	];
	const destinations = [
		"scanKK",
		"scanAkta",
		"scanKTP",
		"scanIjazah",
		"scanDocLain",
		"fotoWajah",
	];

	const ext_scanKK = path.extname(req?.files?.scanKK?.name || "");
	const ext_scanAkta = path.extname(req?.files?.scanAkta?.name || "");
	const ext_scanKTP = path.extname(req?.files?.scanKTP?.name || "");
	const ext_scanIjazah = path.extname(req?.files?.scanIjazah?.name || "");
	const ext_scanDokumenLain = path.extname(
		req?.files?.scanDokumenLain?.name || ""
	);
	const ext_fotoWajah = path.extname(req?.files?.fotoWajah?.name || "");

	const file_scanKK = "scanKK_" + req?.files?.scanKK?.md5 + ext_scanKK || "";
	const file_scanAkta = "scanAkta_" + req?.files?.scanAkta?.md5 + ext_scanAkta|| "";
	const file_scanKTP = "scanKTP_" + req?.files?.scanKTP?.md5 + ext_scanKTP || "";
	const file_scanIjazah =
		"scanIjazah_" + req?.files?.scanIjazah?.md5 + ext_scanIjazah || "";
	const file_scanDokumenLain =
		"scanDokumenLain_" +
			req?.files?.scanDokumenLain?.md5 +
			ext_scanDokumenLain || "";
	const file_fotoWajah =
		"fotoWajah_" + req?.files?.fotoWajah?.md5 + ext_fotoWajah || "";

	const allowedType = [".png", ".jpg", ".jpeg"];
	if (
		!allowedType.includes(
			ext_scanKK.toLowerCase() ||
				ext_scanAkta.toLowerCase() ||
				ext_scanKTP.toLowerCase() ||
				ext_scanIjazah.toLowerCase() ||
				ext_scanDokumenLain.toLowerCase() ||
				ext_fotoWajah.toLowerCase()
		)
	)
		return res
			.status(422)
			.json({ message: "Type file upload must .png, .jpg, .jpeg" });

	if (filesToUpload[0]) {
		await filesToUpload[0].mv(
			`./uploads/${destinations[0]}/${file_scanKK}`
		);
	}
	if (filesToUpload[1]) {
		await filesToUpload[1]?.mv(
			`./uploads/${destinations[1]}/${file_scanAkta}`
		);
	}
	if (filesToUpload[2]) {
		await filesToUpload[2]?.mv(
			`./uploads/${destinations[2]}/${file_scanKTP}`
		);
	}
	if (filesToUpload[3]) {
		await filesToUpload[3]?.mv(
			`./uploads/${destinations[3]}/${file_scanIjazah}`
		);
	}
	if (filesToUpload[4]) {
		await filesToUpload[4]?.mv(
			`./uploads/${destinations[4]}/${file_scanDokumenLain}`
		);
	}
	if (filesToUpload[5]) {
		await filesToUpload[5]?.mv(
			`./uploads/${destinations[5]}/${file_fotoWajah}`
		);
	} 

	try {
		const {
			namaPelapor,
			nomorWA,
			nomorNIK,
			hubunganId,
			jenisKelaminId,
			namaTerlapor,
			namaIbuKandung,
			namaAyahKandung,
			tempatLahir,
			tanggalLahir,
			alamat,
			kelurahanId,
			namaDokumenLain, 
		} = req.body;
		const kerentananId = JSON.parse(req.body.kerentananId);
		const kebutuhanKhususId = JSON.parse(req.body.kebutuhanKhususId);
		// Buat data pelapor
		const dataPelapor = {
			namaPelapor: namaPelapor,
			nomorWA: nomorWA,
			nomorNIK: nomorNIK,
			hubunganId: hubunganId,
		};
		// Buat data terlapor
		const dataTerlapor = {
			namaTerlapor: namaTerlapor,
			jenisKelaminId: jenisKelaminId,
			namaIbuKandung: namaIbuKandung,
			namaAyahKandung: namaAyahKandung,
			tempatLahir: tempatLahir,
			tanggalLahir: tanggalLahir,
			alamat: alamat,
			kelurahanId: kelurahanId,
			fotoWajah: file_fotoWajah,
			scanKK: file_scanKK,
			scanAkta: file_scanAkta,
			scanIjazah: file_scanIjazah,
			scanKTP: file_scanKTP,
			namaDokumenLain: namaDokumenLain,
			scanDokumenLain: file_scanDokumenLain,
		};

		const dataAdmin = await models.User.findAll();
		const firstAdmin = dataAdmin[0];
		const nomorAdmin = firstAdmin.nomorWA;
		const kode = generateUniqueCode();
		const messageToAdmin = `Halo, Bapak/Ibu Petugas !\n\nLaporan masuk Make Petan Tuma.\nNama Pelapor : ${namaPelapor}\nNIK Pelapor : ${nomorNIK}\nNama Terlapor : ${namaTerlapor}`;
		const messageToPelapor = `Halo ${namaPelapor} !\n\nTerima kasih telah melapor. Kami akan segera menghubungi anda.\nKode Pelaporan anda : ${kode}\nGunakan kode untuk mengecek status layanan laporan di http://localhost:3000/status-layanan.\n\nPetugas Disdukcapil Sukoharjo`;

		await sendWhatsAppMessage(nomorWA, messageToPelapor, file_fotoWajah);
		if (!dataError) {
			if (dataPelapor && dataTerlapor) {
				const resPelapor = await models.Pelapor.create(dataPelapor);
				const pelaporId = resPelapor.id;
				dataTerlapor.pelaporId = pelaporId;

				if (dataTerlapor.pelaporId) {
					const resTerlapor = await models.Terlapor.create(dataTerlapor);
					const terlaporId = resTerlapor.id;

					const dataPelaporan = {
						terlaporId: terlaporId,
						kodePelaporan: kode,
						tanggalPelaporan: new Date(),
						statusLayanan: "Di ajukan",
					};
					const getDataKerentanan = kerentananId?.map((obj) => ({
						terlaporId: terlaporId,
						kerentananId: obj.value,
					}));
					const getDataKebKhusus = kebutuhanKhususId ? kebutuhanKhususId?.map((obj) => ({
						terlaporId: terlaporId,
						kebutuhanKhususId: obj.value,
					})) : '';
					if (dataPelaporan) {
						await models.TerlaporRentan.bulkCreate(getDataKerentanan);
						await models.TerlaporKhusus.bulkCreate(getDataKebKhusus);
						await models.Pelaporan.create(dataPelaporan);
						await sendWhatsAppMessage(
							nomorAdmin,
							messageToAdmin,
							file_fotoWajah
						);
						res
							.status(201)
							.json({ success: "Data pelaporan anda berhasil dikirim." });
					}
				} else {
					console.error("Gagal insert data Terlapor");
					res
						.status(500)
						.json({ message: "Tidak ada data pelapor dan terlapor." });
				}
			} else {
				console.error("Gagal insert data Pelapor");
				res
					.status(500)
					.json({ message: "Tidak ada data pelapor dan terlapor." });
			}
		} else {
			console.log("Gagal mengirim data : ", dataError);
			res.status(500).json({ status: false, message: dataError });
		}
	} catch (error) {
		console.error("Gagal insert data : ", error);
		res
			.status(500)
			.json({ message: "Terjadi kesalahan saat memproses permintaan." });
	}
};

const UpdatePelapor = async (req, res) => {
	try {
		const { id } = req.params;
		const { namaPelapor, nomorWA, hubunganId, nomorNIK } = req.body;
		await models.Pelapor.update(
			{ namaPelapor, nomorWA, hubunganId, nomorNIK },
			{
				where: {
					id: id,
				},
			}
		);
		res.status(200).json({ msg: "Data Pelapor berhasil diupdate." });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data Pelapor gagal diupdate" });
	}
};

const DeletePelapor = async (req, res) => {
	try {
		await models.Pelapor.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Data Pelapor berhasil dihapus" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data Pelapor gagal dihapus" });
	}
};

function generateUniqueCode() {
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let result = '';
	const charactersLength = characters.length;
 
	const timestamp = Date.now().toString();
 
	const timeChars = timestamp.slice(-3);
 
	for (let i = 0; i < 3; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
 
	const uniqueCode = timeChars + result;

	return uniqueCode;
}


// function generateUniqueCode() {
// 	const now = new Date();
// 	const seconds = now.getSeconds().toString().padStart(2, "0"); 
// 	const minutes = now.getMinutes().toString().padStart(2, "0"); 
// 	const hours = now.getHours().toString().padStart(2, "0"); 
// 	const date = now.getDate().toString().padStart(2, "0"); 
// 	const month = (now.getMonth() + 1).toString().padStart(2, "0");
// 	const year = now.getFullYear().toString();

// 	// Gabungkan komponen waktu menjadi kode unik
// 	const uniqueCode = `${year}${month}${date}${hours}${minutes}${seconds}`;

// 	return uniqueCode;
// }

const sendWhatsAppMessage = async (number, message, files) => {
	try {
		await axios
			.post("http://localhost:8000/send-message", {
				number: number,
				message: message,
				files: files,
			})
			.then((response) => {
				if (response) {
					// dataError = response.data.response;
					return (dataError = false);
				}
			})
			.catch((e) => {
				console.log("Ini di fungsi : ", e.response.data.response);
				dataError = e.response.data.response;
				return dataError;
			});
	} catch (error) {
		console.error("Errornya : " + error);
		throw new Error("Gagal mengirim pesan WhatsApp.");
	}
};

module.exports = {
	getAllPelapor,
	getPelaporById,
	createPelapor,
	UpdatePelapor,
	DeletePelapor,
};
