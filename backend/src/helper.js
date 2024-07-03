const nodemailer = require('nodemailer');

exports.sendEmail = dataEmail => {
     const transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false, // Use `true` for port 465, `false` for all other ports
				requireTLS: true,
				auth: {
					user: "rikiadhin@gmail.com",
					pass: "jnun pehy ssoz euwg",
				},
     });
     return (
          transporter.sendMail(dataEmail).then(info => console.log(`Email terkirim ${info}`)).catch(err => console.log(`Terjadi error : `, err))
     ) 
}