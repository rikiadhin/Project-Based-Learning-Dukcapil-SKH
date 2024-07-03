const env = process.env.NODE_ENV || 'token';
const config = require(__dirname + '/../../config/config.json')[env]; 
const jsonwebtoken = require('jsonwebtoken');

exports.middleware = async (req, res, next) => {
     const jwtToken = config.jwttoken;
     const token = req.header('token');
     // console.log('author : ',token)
     if (!token) {
          return res.status(401).json({
               message: "Tidak ada token"
          })
     }
     const decode = jsonwebtoken.verify(token, jwtToken)
     req.uid = decode.uid
     next()
}