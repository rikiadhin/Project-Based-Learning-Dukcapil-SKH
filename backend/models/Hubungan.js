'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Hubungan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Hubungan.hasOne(models.Pelapor, {
        foreignKey : 'id'
      })
    }
  }
  Hubungan.init({
    statusHubungan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Hubungan',
  });
  return Hubungan;
};