const models = require('../../models/index');

const getAllTerlaporRentan = async (req, res) => {

     try {
          const response = await models.TerlaporRentan.findAll({
               include: [
                    {
                         model: models.Terlapor,
                         attributes: ['kelurahanId'],
                    }
               ],
               attributes: {
                    exclude: ['createdAt', 'updatedAt']
               },
          });
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getTerlaporRentanById = async (req, res) => {
     try {
          const response = await models.TerlaporRentan.findOne({
               where: {
                    id: req.params.id
               }
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
}

const createTerlaporRentan = async (req, res) => {
     try {
          await models.TerlaporRentan.create(req.body);
          res.status(200).json({ msg: "Data TerlaporRentan berhasil terkirim." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data TerlaporRentan gagal dibuat" });
     }
}

const UpdateTerlaporRentan = async (req, res) => {
     try {
          await models.TerlaporRentan.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data TerlaporRentan berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data TerlaporRentan gagal diupdate" });
     }
}

const DeleteTerlaporRentan = async (req, res) => {
     try {
          await models.TerlaporRentan.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data TerlaporRentan berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data TerlaporRentan gagal dihapus" });
     }
}


module.exports = {
     getAllTerlaporRentan,
     getTerlaporRentanById,
     createTerlaporRentan,
     UpdateTerlaporRentan,
     DeleteTerlaporRentan
}