const models = require("../../models/index");
const path = require("path");

const getAllTerlapor = async (req, res) => {
	try {
		const response = await models.Terlapor.findAll({
			include: [
				{
					model: models.Pelapor,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: models.Hubungan,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				},
				{
					model: models.JenisKelamin,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: models.Kelurahan,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: models.Kecamatan,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				},
				{
					model: models.Pelaporan,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: models.Perekaman,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				},
				{
					model: models.TerlaporKhusus,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: models.KebutuhanKhusus,
							attributes: ["namaKebutuhanKhusus"],
						},
					],
				},
				{
					model: models.TerlaporRentan,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: models.Kerentanan,
							attributes: ["namaKerentanan"],
						},
					],
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
			order: [[{ model: models.Pelaporan }, 'tanggalPelaporan', 'DESC']]
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json(error);
	}
};

const getTerlaporById = async (req, res) => {
	try {
		const response = await models.Terlapor.findOne({
			where: {
				id: req.params.id,
			},
			include: [
				{
					model: models.Pelapor,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: models.Hubungan,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				},
				{
					model: models.JenisKelamin,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: models.Kelurahan,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: {
						model: models.Kecamatan,
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				},
				{
					model: models.Pelaporan,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: models.TerlaporKhusus,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: models.KebutuhanKhusus,
							attributes: ["namaKebutuhanKhusus"],
						},
					],
				},
				{
					model: models.TerlaporRentan,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
					include: [
						{
							model: models.Kerentanan,
							attributes: ["namaKerentanan"],
						},
					],
				},
			],
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
	}
};

const createTerlapor = async (req, res) => {
	try {
		await models.Terlapor.create(req.body);
		res.status(201).json({ msg: "Data Terlapor berhasil dibuat." });
	} catch (error) {
		console.log(error);
	}
};

const UpdateTerlapor = async (req, res) => {
	if (req.files) {
		const { scanKK, scanAkta, scanKTP, scanIjazah, scanDokumenLain } = req.files;
		// console.log('scanKK : ', scanKK);
		const filesToUpload = [
			scanKK,
			scanAkta,
			scanKTP,
			scanIjazah,
			scanDokumenLain,
		];
		const destinations = [
			"scanKK",
			"scanAkta",
			"scanKTP",
			"scanIjazah",
			"scanDocLain",
		]; 
		
		const dataTerlaporById = await models.Terlapor.findOne({
			where: {
				id : req.params.id
			}
		})

		// console.log("data scan akta : ",dataTerlaporById.scanAkta)

		const ext_scanKK = path.extname(req?.files?.scanKK?.name || "");
		const ext_scanAkta = path.extname(req?.files?.scanAkta?.name || "");
		const ext_scanKTP = path.extname(req?.files?.scanKTP?.name || "");
		const ext_scanIjazah = path.extname(req?.files?.scanIjazah?.name || ""); 
		const ext_scanDokumenLain = path.extname(req?.files?.scanDokumenLain?.name || "");
		const ext_fotoWajah = path.extname(req?.files?.fotoWajah?.name || ""); 

		const file_scanKK = "scanKK_" + req?.files?.scanKK?.md5 + ext_scanKK || "";
		const file_scanAkta = "scanAkta_" + req?.files?.scanAkta?.md5 + ext_scanAkta || "";
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
				.json({ msg: "Type file upload must .png, .jpg, .jpeg" });

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
		const {
			namaTerlapor,
			jenisKelaminId,
			namaIbuKandung,
			namaAyahKandung,
			tempatLahir,
			tanggalLahir,
			alamat,
			kelurahanId,
		} = req.body;
		// Proses update data terlapor tanpa memperbarui file jika tidak di-upload
		const dataTerlapor = {
			namaTerlapor: namaTerlapor,
			jenisKelaminId : jenisKelaminId,
			namaIbuKandung: namaIbuKandung,
			namaAyahKandung: namaAyahKandung,
			tempatLahir: tempatLahir,
			tanggalLahir: tanggalLahir,
			alamat: alamat,
			kelurahanId: kelurahanId,
			scanKK: (dataTerlaporById.scanKK == 'scanKK_undefined') ? file_scanKK : dataTerlaporById.scanKK,
			scanAkta: (dataTerlaporById.scanAkta == 'scanAkta_undefined') ? file_scanAkta : dataTerlaporById.scanAkta,
			scanIjazah: (dataTerlaporById.scanIjazah == 'scanIjazah_undefined') ? file_scanIjazah : dataTerlaporById.scanIjazah,
			scanKTP: (dataTerlaporById.scanKTP == 'scanKTP_undefined') ? file_scanKTP : dataTerlaporById.scanKTP,
			scanDokumenLain: (dataTerlaporById.scanDokumenLain == 'scanDokumenLain_undefined') ? file_scanDokumenLain : dataTerlaporById.scanDokumenLain,
		};
		
		try {
			await models.Terlapor.update(dataTerlapor, {
				where: {
					id: req.params.id,
				},
			});
			res.status(200).json({ msg: "Data Terlapor berhasil diupdate." });
		} catch (error) {
			console.log(error.message);
			res.status(500).json({ msg: "Data Terlapor gagal diupdate" });
		}
		return
	}

	// SELESAI IF

	const {
		namaTerlapor,
		jenisKelaminId,
		namaIbuKandung,
		namaAyahKandung,
		tempatLahir,
		tanggalLahir,
		alamat,
		kelurahanId,
	} = req.body;
	// Proses update data terlapor tanpa memperbarui file jika tidak di-upload
	const dataTerlapor = {
		namaTerlapor: namaTerlapor,
		jenisKelaminId: jenisKelaminId,
		namaIbuKandung: namaIbuKandung,
		namaAyahKandung: namaAyahKandung,
		tempatLahir: tempatLahir,
		tanggalLahir: tanggalLahir,
		alamat: alamat,
		kelurahanId: kelurahanId, 
	};
	console.log("data terlapor : ", dataTerlapor)
	try {
		await models.Terlapor.update(dataTerlapor, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Data Terlapor berhasil diupdate." });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data Terlapor gagal diupdate" });
	}

}

const DeleteTerlapor = async (req, res) => {
	try {
		await models.Terlapor.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Data Terlapor berhasil dihapus" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data Terlapor gagal dihapus" });
	}
};

module.exports = {
	getAllTerlapor,
	getTerlaporById,
	createTerlapor,
	UpdateTerlapor,
	DeleteTerlapor,
};
