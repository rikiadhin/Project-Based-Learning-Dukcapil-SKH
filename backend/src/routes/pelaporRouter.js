const router = require("express").Router();
const {
	getAllPelapor,
	getPelaporById,
	createPelapor,
	UpdatePelapor,
	DeletePelapor,
} = require("../controllers/pelaporController.js");
const {
	runValidation,
	formValidation,
} = require("../middlewares/middlewareAuth"); 
   
router.get("/pelapors", getAllPelapor);
router.get("/pelapor/:id", getPelaporById);
router.post("/pelapor", formValidation, runValidation, createPelapor); 
router.patch("/pelapor/:id", UpdatePelapor);
router.delete("/pelapor/:id", DeletePelapor); 
module.exports = router;
