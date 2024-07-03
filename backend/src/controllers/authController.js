const models = require('../../models/index');
const bcryptjs = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'token';
const config = require(__dirname + '/../../config/config.json')[env];
const jwtToken = config.jwttoken;

const loginUser = async (req, res) => {
     try {
          const { email, password } = req.body;
          const dataUser = await models.User.findOne(
               {
                    where:
                    { 
                         email: email
                    }
               }
          ); 
          if (dataUser) {
               const hashedPassword = dataUser.password; 
               const passwordMatch = await bcryptjs.compare(password, hashedPassword); 
               if (passwordMatch) {
                    const data = {
                         idUser: dataUser._idUser
                    }
                    const token = await jsonwebtoken.sign(data, jwtToken, { expiresIn: '5h' } )
                    return res.status(200).json({ status: true, message: "Login berhasil", token: token });
               } else {
                    res.status(404).json({ status: false, message: "Password salah" });
               }
          } else {
               return res.status(404).json({ status: false, message: "Email tidak terdaftar" });
          }
     } catch (error) {
          console.log(error);
     }

}

const getUser = async (req, res) => {
     return res.status(200).json({
          message: "berhasil di celuk"
     })
}

module.exports = {
     loginUser, getUser
}