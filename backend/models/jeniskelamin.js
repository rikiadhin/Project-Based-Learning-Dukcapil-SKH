'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class JenisKelamin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      JenisKelamin.hasOne(models.Terlapor, {
        foreignKey: 'id'
      });
    }
  }
  JenisKelamin.init({
    jenisKelamin: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'JenisKelamin',
  });
  return JenisKelamin;
};