const models = require('../../models/index');
 
const getAllKerentanan = async (req, res) => {
     
     try { 
          const response = await models.Kerentanan.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getKerentananById = async (req, res) => { 
     try {
          const response = await models.Kerentanan.findOne({
               where: {
                    id: req.params.id
               }
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
}

const createKerentanan = async (req, res) => {
     try {
          await models.Kerentanan.create(req.body);  
          res.status(200).json({ msg: "Data kerentanan berhasil terkirim." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data kerentanan gagal dibuat" });
     }
}

const UpdateKerentanan = async (req, res) => {
     try {
          await models.Kerentanan.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data kerentanan berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data kerentanan gagal diupdate" });
     }
}

const DeleteKerentanan = async (req, res) => {
     try {
          await models.Kerentanan.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data kerentanan berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data kerentanan gagal dihapus" });
     }
}
 

module.exports = {
     getAllKerentanan,
     getKerentananById,
     createKerentanan,
     UpdateKerentanan,
     DeleteKerentanan 
}