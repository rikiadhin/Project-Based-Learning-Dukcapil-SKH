const models = require('../../models/index');  
const getAllKebutuhanKhusus = async (req, res) => {
     try {
          const response = await models.KebutuhanKhusus.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getKebutuhanKhususById = async (req, res) => {
     try {
          const response = await models.KebutuhanKhusus.findOne({
               where: {
                    id: req.params.id
               }
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error)
     }
} 
const createKebutuhanKhusus = async (req, res, next) => {
     try {   
          await models.KebutuhanKhusus.create(req.body);   
          res.status(201).json({ msg: "Data Kebutuhan Khusus berhasil dibuat."}); 
     } catch (error) { 
          console.log(error); 
     }
}

const UpdateKebutuhanKhusus = async (req, res) => {
     try {
          await models.KebutuhanKhusus.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Kebutuhan Khusus berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Kebutuhan Khusus gagal diupdate" });
     }
}

const DeleteKebutuhanKhusus = async (req, res) => {
     try {
          await models.KebutuhanKhusus.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Kebutuhan Khusus berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Kebutuhan Khusus gagal dihapus" });
     }
}

module.exports = {
     getAllKebutuhanKhusus,
     getKebutuhanKhususById,
     createKebutuhanKhusus,
     UpdateKebutuhanKhusus,
     DeleteKebutuhanKhusus
}