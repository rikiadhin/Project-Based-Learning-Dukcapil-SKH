'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PetugasPerekaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      PetugasPerekaman.hasMany(models.Perekaman, {
        foreignKey : 'id',
      })
    }
  }
  PetugasPerekaman.init({
    namaPetugas: DataTypes.STRING,
    nomorWA: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'PetugasPerekaman',
  });
  return PetugasPerekaman;
};