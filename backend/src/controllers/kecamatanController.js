const models = require('../../models/index');

const getAllKecamatan = async (req, res) => {
  try {
    const response = await models.Kecamatan.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: models.Kelurahan,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          include: [
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
          ]
        }
      ]
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json(error);
  }
}

const getKecamatanById = async (req, res) => {
  try {
    const response = await models.Kecamatan.findOne({
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
}

const createKecamatan = async (req, res) => {
  try {
    await models.Kecamatan.create(req.body);
    res.status(201).json({ msg: "Data Kecamatan berhasil dibuat." });
  } catch (error) {
    console.log(error);
  }
}

const UpdateKecamatan = async (req, res) => {
  try {
    await models.Kecamatan.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ msg: "Data Kecamatan berhasil diupdate." });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Data Kecamatan gagal diupdate" });
  }
}

const DeleteKecamatan = async (req, res) => {
  try {
    await models.Kecamatan.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json({ msg: "Data Kecamatan berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: "Data Kecamatan gagal dihapus" });
  }
}

module.exports = {
  getAllKecamatan,
  getKecamatanById,
  createKecamatan,
  UpdateKecamatan,
  DeleteKecamatan
} 