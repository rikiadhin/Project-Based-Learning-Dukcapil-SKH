const models = require('../../models/index'); 
const getAllJenisKelamin = async (req, res) => {
     try {
          const response = await models.JenisKelamin.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getJenisKelaminById = async (req, res) => {
     try {
          const response = await models.JenisKelamin.findOne({
               where: {
                    id: req.params.id
               }
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
}
let dataError;
const createJenisKelamin = async (req, res) => {
     try {  
          await models.JenisKelamin.create(req.body);  
          res.status(201).json({ success: "Data pelaporan anda berhasil dikirim." });
     } catch (error) {
          console.log(error);
     }
}

const UpdateJenisKelamin = async (req, res) => {
     try {
          await models.JenisKelamin.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data JenisKelamin berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data JenisKelamin gagal diupdate" });
     }
}

const DeleteJenisKelamin = async (req, res) => {
     try {
          await models.JenisKelamin.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data JenisKelamin berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data JenisKelamin gagal dihapus" });
     }
}
 


module.exports = {
     getAllJenisKelamin,
     getJenisKelaminById,
     createJenisKelamin,
     UpdateJenisKelamin,
     DeleteJenisKelamin
} 