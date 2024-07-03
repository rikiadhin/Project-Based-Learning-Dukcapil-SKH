'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pelapor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pelapor.hasOne(models.Terlapor, {
        foreignKey: 'id'
      });
      Pelapor.belongsTo(models.Hubungan, {
        foreignKey : 'hubunganId'
      })
    }
  }
  Pelapor.init({
    namaPelapor: DataTypes.STRING,
    nomorWA: DataTypes.STRING,
    hubunganId: DataTypes.INTEGER,
    nomorNIK: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pelapor',
  });
  return Pelapor;
};