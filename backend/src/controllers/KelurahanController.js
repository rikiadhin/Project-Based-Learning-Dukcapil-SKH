const { where } = require('sequelize');
const models = require('../../models/index'); 
const getAllKelurahan = async (req, res) => {
     try {
          const response = await models.Kelurahan.findAll(
               { 
                    include: [
                         {
                              model: models.Kecamatan,
                              attributes: ['namaKecamatan'],
                         },
                         {
                              model: models.Terlapor,  
                              attributes: ['kelurahanId', 'id'],
                              include: [
                                   {
                                        model: models.Pelaporan,
                                        attributes: ['tanggalPelaporan'],  
                              },
                                   {
                                        model: models.TerlaporKhusus,
                                        attributes: {
                                             exclude: ["createdAt", "updatedAt"],
                                        },
                                        include: [
                                             {
                                                  model: models.KebutuhanKhusus,
                                                  attributes: ["namaKebutuhanKhusus"],
                                             },
                                        ],
                                   },
                                   {
                                        model: models.TerlaporRentan,
                                        attributes: {
                                             exclude: ["createdAt", "updatedAt"],
                                        },
                                        include: [
                                             {
                                                  model: models.Kerentanan,
                                                  attributes: ["namaKerentanan"],
                                             },
                                        ],
                                   },
                              ]
                         }
                    ],
                    attributes: {
                         exclude: ['createdAt', 'updatedAt']
                    },

               }
          )
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getKelurahanById = async (req, res) => {
     try {
          const response = await models.Kelurahan.findOne({
               where: {
                    id: req.params.id
               },
               include: [
                    {
                         attributes: ['namaKecamatan'],
                         model: models.Kecamatan
                    },
                    {
                         model: models.Terlapor,
                         attributes: ['kelurahanId'],
                         include: [
                              {
                                   model: models.TerlaporKhusus,
                                   attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                   },
                                   include: [
                                        {
                                             model: models.KebutuhanKhusus,
                                             attributes: ["namaKebutuhanKhusus"],
                                        },
                                   ],
                              },
                              {
                                   model: models.TerlaporRentan,
                                   attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                   },
                                   include: [
                                        {
                                             model: models.Kerentanan,
                                             attributes: ["namaKerentanan"],
                                        },
                                   ],
                              },
                         ]
                    }
               ],
               attributes: {
                    exclude: ['createdAt', 'updatedAt']
               },
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error)
     }
}
const getKelurahanByIdKecamatan = async (req, res) => {
     try {
          const response = await models.Kelurahan.findAll({
               where: {
                    kecamatanId: req.params.idKec
               },
               include: [
                    {
                         model: models.Kecamatan,
                         attributes: ['namaKecamatan'], 
                    },
                    {
                         model: models.Terlapor,
                         attributes: ['kelurahanId'],
                         include: [
                              {
                                   model: models.TerlaporKhusus,
                                   attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                   },
                                   include: [
                                        {
                                             model: models.KebutuhanKhusus,
                                             attributes: ["namaKebutuhanKhusus"],
                                        },
                                   ],
                              },
                              {
                                   model: models.TerlaporRentan,
                                   attributes: {
                                        exclude: ["createdAt", "updatedAt"],
                                   },
                                   include: [
                                        {
                                             model: models.Kerentanan,
                                             attributes: ["namaKerentanan"],
                                        },
                                   ],
                              },
                         ]
                    }
               ],
               attributes: {
                    exclude: ['createdAt', 'updatedAt']
               },
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error)
     }
}

const createKelurahan = async (req, res) => {
     try {
          await models.Kelurahan.create(req.body);
          res.status(201).json({ msg: "Data Kelurahan berhasil dibuat." });
     } catch (error) {
          console.log(error);
     }
}

const UpdateKelurahan = async (req, res) => {
     try {
          await models.Kelurahan.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Kelurahan berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Kelurahan gagal diupdate" });
     }
}

const DeleteKelurahan = async (req, res) => {
     try {
          await models.Kelurahan.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Kelurahan berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Kelurahan gagal dihapus" });
     }
}

module.exports = {
     getAllKelurahan,
     getKelurahanById,
     getKelurahanByIdKecamatan,
     createKelurahan,
     UpdateKelurahan,
     DeleteKelurahan
}