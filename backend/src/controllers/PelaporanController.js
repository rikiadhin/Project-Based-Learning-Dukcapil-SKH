const models = require("../../models/index");
const axios = require("axios");

const getAllPelaporan = async (req, res) => {
	try {
		const response = await models.Pelaporan.findAll({
			include: [
				{
					model: models.Terlapor,
					attributes: ['pelaporId'],
					include: [
						{
							model: models.Pelapor,
							attributes: {
								exclude: ["createdAt", "updatedAt"],
							},
						}
					]
				}
			]
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json(error);
	}
};

const getPelaporanById = async (req, res) => {
	try {
		const response = await models.Pelaporan.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
	}
};

const createPelaporan = async (req, res) => {
	try {
		const { terlaporId } = req.body;
		const data = {
			terlaporId: terlaporId,
			kodePelaporan: uniqueCode,
			tanggalPelaporan: new Date(),
			statusLayanan: "Di ajukan",
		};
		await models.Pelaporan.create(data);
		res.status(201).json({ msg: "Data Pelaporan berhasil dibuat." });
	} catch (error) {
		console.log(error);
	}
};

const UpdatePelaporan = async (req, res) => {
	try {
		const { namaPelapor, nomorWA, pesan, statusLayanan } = req.body;
		const { id } = req.params;
		await models.Pelaporan.update(
			{ statusLayanan },
			{
				where: {
					id: id,
				},
			}
		);
		if (statusLayanan == "Di tolak") {
			const messageToPelaporAccept = `Halo ${namaPelapor} !\n\nKami telah melakukan verifikasi laporan anda.\nMohon maaf laporan anda kami tolak.\nAlasan : ${pesan}, terima kasih.\nSilakan cek status layanan laporan anda di https://makepetan.com/status-layanan.\n\nPetugas Disdukcapil Sukoharjo`;
			await sendWhatsAppMessage(nomorWA, messageToPelaporAccept);
		} else if (statusLayanan == "Verifikasi") {
			const messageToPelaporReject = `Halo ${namaPelapor} !\n\nKami telah melakukan verifikasi laporan anda.\nTerima kasih, laporan anda kami terima.\nSilakan cek status layanan laporan anda di https://makepetan.com/status-layanan.\n\nPetugas Disdukcapil Sukoharjo`;
			await sendWhatsAppMessage(nomorWA, messageToPelaporReject);
		} else {
			const messageToPelaporDone = `Halo ${namaPelapor} !\n\nKami telah melakukan verifikasi laporan anda.\nTerima kasih, laporan anda sudah selesai.\nSilakan cek status layanan laporan anda di https://makepetan.com/status-layanan.\n\nPetugas Disdukcapil Sukoharjo`;
			await sendWhatsAppMessage(nomorWA, messageToPelaporDone);
		}
		res.status(200).json({ msg: "Data Pelaporan berhasil diupdate." });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data Pelaporan gagal diupdate" });
	}
};

const DeletePelaporan = async (req, res) => {
	try {
		await models.Pelaporan.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Data Pelaporan berhasil dihapus" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data Pelaporan gagal dihapus" });
	}
};

const uniqueCode = generateUniqueCode();
function generateUniqueCode() {
	const now = new Date();
	const seconds = now.getSeconds().toString().padStart(2, "0"); // Ambil detik dan pad dengan '0' jika hanya satu digit
	const minutes = now.getMinutes().toString().padStart(2, "0"); // Ambil menit dan pad dengan '0' jika hanya satu digit
	const hours = now.getHours().toString().padStart(2, "0"); // Ambil jam dan pad dengan '0' jika hanya satu digit
	const date = now.getDate().toString().padStart(2, "0"); // Ambil tanggal dan pad dengan '0' jika hanya satu digit
	const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Ambil bulan (dimulai dari 0) dan pad dengan '0' jika hanya satu digit
	const year = now.getFullYear().toString(); // Ambil tahun

	// Gabungkan komponen waktu menjadi kode unik
	const uniqueCode = `${year}${month}${date}${hours}${minutes}${seconds}`;

	return uniqueCode;
}

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
	getAllPelaporan,
	getPelaporanById,
	createPelaporan,
	UpdatePelaporan,
	DeletePelaporan,
};
