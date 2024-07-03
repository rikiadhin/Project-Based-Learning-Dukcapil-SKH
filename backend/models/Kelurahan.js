'use strict';
const {
  Model
} = require('sequelize'); 
module.exports = (sequelize, DataTypes) => {
  class Kelurahan extends Model { 
    static associate(models) { 
      Kelurahan.belongsTo(models.Kecamatan, { foreignKey: 'kecamatanId', targetKey: 'kodeWilayahKec' });
      Kelurahan.hasMany(models.Terlapor, { foreignKey: 'kelurahanId' });
    }
  }
  Kelurahan.init({
    kodeWilayahKel: DataTypes.INTEGER,
    kecamatanId: DataTypes.INTEGER,
    namaKelurahan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kelurahan',
  });
  return Kelurahan;
};