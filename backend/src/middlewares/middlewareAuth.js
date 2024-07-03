const { check, validationResult } = require("express-validator");

const runValidation = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(404).json({
			status: false,
			message: errors.array()[0].msg,
		});
	}
	next();
};

const loginValidation = [
	check("email", "Email tidak boleh kosong !").notEmpty(),
	check("password", "Password tidak boleh kosong !").notEmpty(),
	check('checkbox', 'Checkbox tidak boleh kosong !').isBoolean().custom(value => value === true)
];

const formValidation = [
	check("namaPelapor", "Nama pelapor tidak boleh kosong !").notEmpty(),
	check("nomorWA", "Nomor WhatsApp tidak boleh kosong !").notEmpty(),
	check('nomorNIK')
		.notEmpty().withMessage('Nomor NIK tidak boleh kosong !')
		.isLength({ min: 12, max: 16 }).withMessage('Nomor NIK harus berisi 16 digit !'),
	check("hubunganId", "Hubungan tidak boleh kosong !").notEmpty(), 

	check("namaTerlapor", "Nama Terlapor tidak boleh kosong !").notEmpty(),
	check("jenisKelaminId", "Jenis kelamin tidak boleh kosong !").notEmpty(),
	check("namaIbuKandung", "Nama Ibu Kandung tidak boleh kosong !").notEmpty(),
	check("namaAyahKandung", "Nama ayah kandung tidak boleh kosong !").notEmpty(),
	check("tempatLahir", "Tempat Lahir tidak boleh kosong !").notEmpty(),
	check("tanggalLahir", "Tanggal Lahir tidak boleh kosong !").notEmpty(),
	check("alamat", "Alamat tidak boleh kosong !").notEmpty(),
	check("kelurahanId", "Kelurahan tidak boleh kosong !").notEmpty(),
	check("fotoWajah", "Foto Wajah tidak boleh kosong !").custom(
		(value, { req }) => {
			if (!req.files || !req.files.fotoWajah) {
				throw new Error("Foto Wajah tidak boleh kosong !");
			}
			return true;
		}
	),
	check("kerentananId", "Kerentanan tidak boleh kosong !")
		.isString()
		.notEmpty(),
	check("agree", "Harap mengisi checkbox !").notEmpty(),
];
 
const changePassword = [
	check("currentPassword", "Password tidak boleh kosong !").notEmpty(),
	check("newPassword", "Password baru tidak boleh kosong !").notEmpty(),
	check(
		"confirmPassword",
		"Konfirmasi password tidak boleh kosong !"
	).notEmpty(),
	check("newPassword")
		.isLength({ min: 8 })
		.withMessage("Password harus minimal 8 karakter")
		.matches(/[A-Z]/)
		.withMessage("Password harus berisi minimal satu huruf kapital")
		.matches(/[a-z]/)
		.withMessage("Password harus berisi minimal satu huruf kecil")
		.matches(/[0-9]/)
		.withMessage("Password harus berisi minimal satu angka")
		.matches(/[\W]/)
		.withMessage("Password harus berisi minimal satu karakter khusus"),
 
]; 


// VALIDASI UNTUK DAFTAR ======================================
// const registrasiValidation = [
//      check('email', 'Email tidak boleh kosong !').notEmpty().matches(/.+\@.+\..+/).withMessage('Masukkan format email yang benar !'),
//      check('password', 'Password tidak boleh kosong !').notEmpty().isLength({min:8}).withMessage('Password minimal 8 characters'),
// ]

module.exports = {
	runValidation,
	loginValidation,
	formValidation,
	changePassword
};
