const models = require('../../models/index');
const path = require("path");

const getAllPerekaman = async (req, res) => {
     try {
          const response = await models.Perekaman.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
}

const getPerekamanById = async (req, res) => {
     try {
          const response = await models.Perekaman.findOne({
               where: {
                    pelaporanId: req.params.id
               }
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
}

const createPerekaman = async (req, res) => {
     try {
          // Check if req.body is empty or missing required fields
          if (!req?.body || !req?.files?.dokumenHasilPerekaman) {
               return res.status(200).json({ msg: "Invalid data provided" });

          } else {
               const { kodePelaporan, petugasOne, petugasTwo, tanggalPerekaman } = req.body;
               const dokumenHasilPerekaman = req?.files?.dokumenHasilPerekaman || "";
               const ext_dokumenHasilPerekaman = path.extname(req?.files?.dokumenHasilPerekaman?.name || "");
               console.log('file ', dokumenHasilPerekaman);
               console.log('body ', req.body);
               const file_dokumenHasilPerekaman = "hasilPerekaman_" + req?.files?.dokumenHasilPerekaman?.md5 + ext_dokumenHasilPerekaman || "";
               const allowedType = [".png", ".jpg", ".jpeg"];

               const dataPerekaman = await models.Perekaman.findOne({
                    where: {
                         pelaporanId: kodePelaporan
                    }
               });

               const reqPerekaman = {
                    petugasOne: petugasOne,
                    petugasTwo: petugasTwo,
                    tanggalPerekaman: tanggalPerekaman,
                    dokumenHasilPerekaman: file_dokumenHasilPerekaman
               };

               if (dataPerekaman) {
                    if (dokumenHasilPerekaman && !allowedType.includes(ext_dokumenHasilPerekaman.toLowerCase())) {
                         return res.status(422).json({ msg: "Type file upload must .png, .jpg, .jpeg" });
                    }

                    if (dokumenHasilPerekaman) {
                         await dokumenHasilPerekaman.mv(`./uploads/hasilPerekaman/${file_dokumenHasilPerekaman}`);
                    }
                    await models.Perekaman.update({petugasOne, petugasTwo, tanggalPerekaman }, {
                         where: {
                              pelaporanId: kodePelaporan
                         }
                    });
                    console.log("Data Perekaman berhasil diupdate 1.");
                    return res.status(200).json({ msg: "Data Perekaman berhasil diupdate." });
               } else {
                    if (dokumenHasilPerekaman && !allowedType.includes(ext_dokumenHasilPerekaman.toLowerCase())) {
                         return res.status(422).json({ msg: "Type file upload must .png, .jpg, .jpeg" });
                    }

                    if (dokumenHasilPerekaman) {
                         await dokumenHasilPerekaman.mv(`./uploads/hasilPerekaman/${file_dokumenHasilPerekaman}`);
                    }
                    const reqPerekaman = {
                         pelaporanId: kodePelaporan,
                         petugasOne: petugasOne,
                         petugasTwo: petugasTwo,
                         tanggalPerekaman: tanggalPerekaman,
                         dokumenHasilPerekaman: file_dokumenHasilPerekaman
                    };
                    try {
                         await models.Perekaman.create(reqPerekaman);
                         console.log("Data Perekaman berhasil diupdate 2.");
                         return res.status(201).json({ msg: "Data perekaman berhasil dibuat." });
                    } catch (error) {
                         console.log(error);
                         return res.status(500).json({ msg: "Data Perekaman gagal dibuat" });
                    }
               }
          }
          } catch (error) {
               console.log(error);
               return res.status(500).json({ msg: "Data Perekaman gagal diupdate" });
          }
     
    //  if (req.body) {
    //       try {
    //            const { kodePelaporan, petugasOne, petugasTwo, tanggalPerekaman } = req.body;
    //            const dokumenHasilPerekaman = req?.files?.dokumenHasilPerekaman || "";
    //            const ext_dokumenHasilPerekaman = path.extname(req?.files?.dokumenHasilPerekaman?.name || "");
    //            console.log('file ', dokumenHasilPerekaman);
    //            console.log('body ', req.body);
    //            const file_dokumenHasilPerekaman = "hasilPerekaman_" + req?.files?.dokumenHasilPerekaman?.md5 + ext_dokumenHasilPerekaman || "";
    //            const allowedType = [".png", ".jpg", ".jpeg"];

    //            const dataPerekaman = await models.Perekaman.findOne(
    //                 {
    //                      where:
    //                      {
    //                           pelaporanId: kodePelaporan
    //                      }
    //                 }
    //            );
    //            const reqPerekaman = {
    //                 petugasOne: petugasOne,
    //                 petugasTwo: petugasTwo,
    //                 tanggalPerekaman: tanggalPerekaman,
    //                 dokumenHasilPerekaman: file_dokumenHasilPerekaman
    //            }

    //            if (dataPerekaman) {
    //                 if (
    //                      !allowedType.includes(
    //                           ext_dokumenHasilPerekaman.toLowerCase()
    //                      )
    //                 )
    //                      return res
    //                           .status(422)
    //                           .json({ msg: "Type file upload must .png, .jpg, .jpeg" });

    //                 if (dokumenHasilPerekaman) {
    //                      await dokumenHasilPerekaman.mv(
    //                           `./uploads/hasilPerekaman/${file_dokumenHasilPerekaman}`
    //                      );
    //                 }
    //                 await models.Perekaman.update(reqPerekaman, {
    //                      where: {
    //                           pelaporanId: kodePelaporan
    //                      }
    //                 })
    //                 console.log("Data Perekaman berhasil diupdate 1.")
    //                 res.status(200).json({ msg: "Data Perekaman berhasil diupdate." });
    //            } else {
    //                 if (
    //                      !allowedType.includes(
    //                           ext_dokumenHasilPerekaman.toLowerCase()
    //                      )
    //                 )
    //                      return res
    //                           .status(422)
    //                           .json({ msg: "Type file upload must .png, .jpg, .jpeg" });

    //                 if (dokumenHasilPerekaman) {
    //                      await dokumenHasilPerekaman.mv(
    //                           `./uploads/hasilPerekaman/${file_dokumenHasilPerekaman}`
    //                      );
    //                 }
    //                 const reqPerekaman = {
    //                      pelaporanId: kodePelaporan,
    //                      petugasOne: petugasOne,
    //                      petugasTwo: petugasTwo,
    //                      tanggalPerekaman: tanggalPerekaman,
    //                      dokumenHasilPerekaman: file_dokumenHasilPerekaman
    //                 }
    //                 try {
    //                      await models.Perekaman.create(reqPerekaman);
    //                      console.log("Data Perekaman berhasil diupdate 2.")
    //                      res.status(201).json({ msg: "Data perekaman berhasil dibuat." });
    //                 } catch (error) {
    //                      console.log(error);
    //                 }
    //            }
    //       } catch (error) {
    //            console.log(error);
    //            res.status(500).json({ msg: "Data Perekaman gagal diupdate" });
    //       } 
    //  }
    //  res.status(201).json({ msg: "Data perekaman berhasil dibuat." });
}

const UpdatePerekaman = async (req, res) => {
     try {
          await models.Perekaman.update(req.body, {
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Perekaman berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Perekaman gagal diupdate" });
     }
}

const DeletePerekaman = async (req, res) => {
     try {
          await models.Perekaman.destroy({
               where: {
                    id: req.params.id
               }
          })
          res.status(200).json({ msg: "Data Perekaman berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data Perekaman gagal dihapus" });
     }
}

module.exports = {
     getAllPerekaman,
     getPerekamanById,
     createPerekaman,
     UpdatePerekaman,
     DeletePerekaman
} 