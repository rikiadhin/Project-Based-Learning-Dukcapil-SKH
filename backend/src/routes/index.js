const app = require('express').Router()
const KelurahanRouter = require("./kelurahanRouter")
const KecamatanRouter = require("./kecamatanRouter")
const KerentananRouter = require("./kerentananRouter")
const KebutuhanKhususRouter = require("./kebutuhanKhususRouter")
const HubunganRouter = require("./hubunganRouter")
const PelaporanRouter = require('./pelaporanRouter')
const PelaporRouter = require('./pelaporRouter')
const PerekamanRouter = require('./perekamanRouter.js')
const PetugasPerekaman = require('./petugasPerekamanRouter.js')
const TerlaporRouter = require('./terlaporRouter.js')
const UserRouter = require('./userRouter.js')
const TerlaporRentansRouter = require('./terlaporRentanRouter.js')
const TerlaporKhususRouter = require('./terlaporKhususRouter.js')
const JenisKelamin = require('./jenisKelaminRouter.js')
const AuthRouter = require('./authRouter.js') 
const { errorHandling, notFound } = require("../controllers/errorController")

app.use('/api', KelurahanRouter);
app.use('/api', KecamatanRouter);
app.use('/api', KerentananRouter);
app.use('/api', KebutuhanKhususRouter);
app.use('/api', HubunganRouter);
app.use('/api', JenisKelamin);
app.use('/api', PelaporanRouter);
app.use('/api', PelaporRouter);
app.use('/api', PerekamanRouter);
app.use('/api', PetugasPerekaman);
app.use('/api', TerlaporRouter);
app.use('/api', UserRouter);
app.use('/api', TerlaporRentansRouter); 
app.use('/api', TerlaporKhususRouter); 
app.use('/auth', AuthRouter); 
// error handling and not found
// app.use('*', errorHandling, notFound)
 

module.exports = app