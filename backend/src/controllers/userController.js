const models = require("../../models/index");
const jsonwebsoken = require("jsonwebtoken");
const env = process.env.NODE_ENV || "token";
const config = require(__dirname + "/../../config/config.json")[env];
const jwtToken = config.jwttoken;
const { sendEmail } = require("../helper");
const bcryptjs = require("bcryptjs");

const getAllUser = async (req, res) => {
     try {
          const response = await models.User.findAll();
          res.status(200).json(response);
     } catch (error) {
          res.status(400).json(error);
     }
};

const getUserById = async (req, res) => {
     try {
          const response = await models.User.findOne({
               where: {
                    id: req.params.id,
               },
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
};

const getUserByEmail = async (req, res) => {
     try {
          const response = await models.User.findOne({
               where: {
                    email: req.params.email,
               },
          });
          res.status(200).json(response);
     } catch (error) {
          console.log(error.message);
     }
};

const createUser = async (req, res) => {
     try {
          await models.User.create(req.body);
          res.status(201).json({ msg: "Data User berhasil dibuat." });
     } catch (error) {
          console.log(error);
     }
};

const UpdateUser = async (req, res) => {
     try {
          const { email1 } = req.params;
          const { nama,email, nomorWA } = req.body;
          await models.User.update(
               { nama, email, nomorWA },
               {
                    where: {
                         email: email1,
                    },
               }
          );
          res.status(200).json({ msg: "Data user berhasil diupdate." });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data User gagal diupdate" });
     }
};

const DeleteUser = async (req, res) => {
     try {
          await models.User.destroy({
               where: {
                    id: req.params.id,
               },
          });
          res.status(200).json({ msg: "Data User berhasil dihapus" });
     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Data User gagal dihapus" });
     }
};

const fotgotPassword = async (req, res) => {
     const { email } = req.body;
     const user = await models.User.findOne({
          where: {
               email: email,
          },
     });
     if (!user) {
          return res.status(404).json({
               status: false,
               message: "Email tidak terdaftar",
          });
     }
     const token = jsonwebsoken.sign(
          {
               idUser: user._idUser,
          },
          jwtToken
     );
     const resetPasswordLink = token;
     await models.User.update({ resetPasswordLink }, {
          where: {
               email: email,
          },
     });

     const templateEmail = {
          from: "AR Programming",
          to: email,
          subject: "Link reset password",
          html: `<p>Silakan klik link dibawah untuk reset password : <p/> <p>http://localhost:3000/reset-password/${resetPasswordLink}</p>`,
     };
     sendEmail(templateEmail);
     return res.status(200).json({
          status: true,
          message: "Link reset password berhasil terkirim, silakan cek email anda.",
          data: email,
     });
};

const ChangePassword = async (req, res) => {
     try {
          const { email } = req.params;
          const { currentPassword, newPassword } = req.body;
          const dataUser = await models.User.findOne(
               {
                    where:
                    {
                         email: email
                    }
               }
          );
          const oldHashedPassword = dataUser.password;
          const passwordMatch = await bcryptjs.compare(currentPassword, oldHashedPassword);
          if (passwordMatch) {
               const password = await bcryptjs.hash(newPassword, 10);
               await models.User.update(
                    { password },
                    {
                         where: {
                              email: email,
                         },
                    }
               );
               res.status(200).json({ msg: "Password berhasil diupdate." });
          } else {
               res.status(500).json({ msg: "Current password anda salah." });
          }

     } catch (error) {
          console.log(error.message);
          res.status(500).json({ msg: "Password gagal diupdate" });
     }
};

const ResetPassword = async (req, res) => {
     const { token, newPassword } = req.body;
     console.log("Received request to reset password.");
     console.log("token : ", token, "\npassword : ", newPassword);

     try {
          const user = await models.User.findOne({
               where: {
                    resetPasswordLink: token
               }
          });

          if (user) {
               const password = await bcryptjs.hash(newPassword, 10);
               await models.User.update(
                    { password },
                    {
                         where: {
                              resetPasswordLink: token,
                         },
                    }
               ); 
               return res.status(200).json({
                    message: "Password berhasil diupdate, silahkan login kembali."
               });
          } else { 
               return res.status(404).json({
                    message: "Token tidak ada, silahkan coba lagi."
               });
          }
     } catch (error) { 
          return res.status(500).json({
               message: "Password gagal diupdate, silahkan coba lagi."
          });
     }
};

module.exports = {
     getAllUser,
     getUserById,
     getUserByEmail,
     createUser,
     UpdateUser,
     DeleteUser,
     fotgotPassword,
     ChangePassword,
     ResetPassword
};
