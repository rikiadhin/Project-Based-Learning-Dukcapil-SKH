const models = require('../../models/index'); 
const getAllHubungan = async (req, res) => {
     try {
          const response = await models.Hubungan.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getHubunganById = async (req, res) => {
     try {
          const response = await models.Hubungan.findOne({
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

const createHubungan = async (req, res) => {
     try {  
          await models.Hubungan.create(req.body);  
          res.status(201).json({ success: "Data hubungan anda berhasil dikirim." });
     } catch (error) {
          console.log(error);
     }
}

const UpdateHubungan = async (req, res) => {
     try {
          await models.Hubungan.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Hubungan berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Hubungan gagal diupdate" });
     }
}

const DeleteHubungan = async (req, res) => {
     try {
          await models.Hubungan.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Hubungan berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Hubungan gagal dihapus" });
     }
}
 


module.exports = {
     getAllHubungan,
     getHubunganById,
     createHubungan,
     UpdateHubungan,
     DeleteHubungan
} 