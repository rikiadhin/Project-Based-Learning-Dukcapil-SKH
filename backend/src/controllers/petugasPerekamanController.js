const models = require("../../models/index");

const getAllPetugasPerekaman = async (req, res) => {
	try {
		const response = await models.PetugasPerekaman.findAll({
			attributes: {
				exclude: ["createdAt", "updatedAt"],
			},
		});
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json(error);
	}
};

const getPetugasPerekamanById = async (req, res) => {
	try {
		const response = await models.PetugasPerekaman.findOne({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json(response);
	} catch (error) {
		console.log(error.message);
	}
};

const createPetugasPerekaman = async (req, res) => {
	try {
		await models.PetugasPerekaman.create(req.body);
		res.status(201).json({ msg: "Data PetugasPerekaman berhasil dibuat." });
	} catch (error) {
		console.log(error);
	}
};

const UpdatePetugasPerekaman = async (req, res) => {
	try {
		await models.PetugasPerekaman.update(req.body, {
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Data PetugasPerekaman berhasil diupdate." });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data PetugasPerekaman gagal diupdate" });
	}
};

const DeletePetugasPerekaman = async (req, res) => {
	try {
		await models.PetugasPerekaman.destroy({
			where: {
				id: req.params.id,
			},
		});
		res.status(200).json({ msg: "Data PetugasPerekaman berhasil dihapus" });
	} catch (error) {
		console.log(error.message);
		res.status(500).json({ msg: "Data PetugasPerekaman gagal dihapus" });
	}
};

module.exports = {
	getAllPetugasPerekaman,
	getPetugasPerekamanById,
	createPetugasPerekaman,
	UpdatePetugasPerekaman,
	DeletePetugasPerekaman,
};
