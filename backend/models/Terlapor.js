'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Terlapor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Terlapor.hasOne(models.Pelaporan, { foreignKey: 'id' });
      Terlapor.belongsTo(models.Pelapor, {
        foreignKey: 'pelaporId',
      });
      Terlapor.belongsTo(models.Kelurahan, {
        foreignKey: 'kelurahanId'
      });
      Terlapor.hasMany(models.TerlaporKhusus, {
        foreignKey: 'terlaporId' 
      });
      Terlapor.hasMany(models.TerlaporRentan, {
        foreignKey: 'terlaporId'
      });
      Terlapor.belongsTo(models.JenisKelamin, {
        foreignKey: 'jenisKelaminId',
      });
      // Terlapor.belongsTo(models.KebutuhanKhusus, {
      //   foreignKey: 'kebutuhanKhususId'
      // })
    }
  }
  Terlapor.init({
    pelaporId: DataTypes.INTEGER,
    namaTerlapor: DataTypes.STRING,
    jenisKelaminId:DataTypes.INTEGER,
    namaIbuKandung: DataTypes.STRING,
    namaAyahKandung: DataTypes.STRING,
    tempatLahir: DataTypes.STRING,
    tanggalLahir: DataTypes.STRING,
    alamat: DataTypes.STRING,
    kelurahanId: DataTypes.INTEGER,  
    fotoWajah: DataTypes.STRING,
    scanKK: DataTypes.STRING,
    scanAkta: DataTypes.STRING,
    scanIjazah: DataTypes.STRING,
    scanKTP: DataTypes.STRING,
    namaDokumenLain: DataTypes.STRING,
    scanDokumenLain: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Terlapor',
  });
  return Terlapor;
};