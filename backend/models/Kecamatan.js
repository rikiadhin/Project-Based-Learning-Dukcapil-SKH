'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kecamatan extends Model { 
    static associate(models) {
      Kecamatan.hasMany(models.Kelurahan, {
        foreignKey: 'kecamatanId', sourceKey: 'kodeWilayahKec'
      })
    }
  }
  Kecamatan.init({
    kodeWilayahKec : DataTypes.INTEGER,
    namaKecamatan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kecamatan',
  });
  return Kecamatan;
};