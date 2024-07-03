const path = require("path");
const multer = require("multer");

// Fungsi untuk mengatur nama file
const customFilename = (req, file, cb) => {
	const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
	const fileExtension = path.extname(file.originalname);
	cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
};

// Konfigurasi penyimpanan untuk setiap jenis file
const storage = (folder) =>
	multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, "../../uploads/", folder));
		},
		filename: customFilename,
	});

// Menggunakan konfigurasi penyimpanan di multer
const uploadFotoWajah = multer({ storage: storage("fotoWajah") });
const uploadScanKK = multer({ storage: storage("scanKK") });
const uploadScanKTP = multer({ storage: storage("scanKTP") });
const uploadScanAkta = multer({ storage: storage("scanAkta") });
const uploadScanIjazah = multer({ storage: storage("scanIjazah") });
const uploadScanDokumenLain = multer({ storage: storage("scanDocLain") });

module.exports = {
	uploadFotoWajah,
	uploadScanKK,
	uploadScanKTP,
	uploadScanAkta,
	uploadScanIjazah,
	uploadScanDokumenLain,
};