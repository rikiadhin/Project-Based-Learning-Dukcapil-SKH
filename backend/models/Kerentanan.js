'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kerentanan extends Model {  
    static associate(models) {
      Kerentanan.hasMany(models.TerlaporRentan, {
        foreignKey: 'kerentananId'
      });
    }
  }
  Kerentanan.init({
    namaKerentanan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Kerentanan',
  });
  return Kerentanan;
};