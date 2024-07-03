const models = require('../../models/index');

const getAllTerlaporKhusus = async (req, res) => {

     try {
          const response = await models.TerlaporKhusus.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getTerlaporKhususById = async (req, res) => {
     try {
          const response = await models.TerlaporKhusus.findOne({
               where: {
                    id: req.params.id
               }
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
}

const createTerlaporKhusus = async (req, res) => {
     try {
          await models.TerlaporKhusus.create(req.body);
          res.status(200).json({ msg: "Data TerlaporKhusus berhasil terkirim." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data TerlaporKhusus gagal dibuat" });
     }
}

const UpdateTerlaporKhusus = async (req, res) => {
     try {
          await models.TerlaporKhusus.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data TerlaporKhusus berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data TerlaporKhusus gagal diupdate" });
     }
}

const DeleteTerlaporKhusus = async (req, res) => {
     try {
          await models.TerlaporKhusus.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data TerlaporKhusus berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data TerlaporKhusus gagal dihapus" });
     }
}


module.exports = {
     getAllTerlaporKhusus,
     getTerlaporKhususById,
     createTerlaporKhusus,
     UpdateTerlaporKhusus,
     DeleteTerlaporKhusus
}