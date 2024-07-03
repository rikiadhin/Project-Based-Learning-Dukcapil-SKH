'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelaporan extends Model {
    static associate(models) {
      Pelaporan.hasOne(models.Perekaman, {
        foreignKey: 'pelaporanId'
      });
      Pelaporan.belongsTo(models.Terlapor, {
        foreignKey: 'terlaporId'
      })
    }
  }
  Pelaporan.init({
    kodePelaporan : DataTypes.STRING,
    terlaporId: DataTypes.INTEGER,
    tanggalPelaporan: DataTypes.DATE,
    statusLayanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pelaporan',
  });
  return Pelaporan;
};