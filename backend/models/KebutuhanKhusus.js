'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KebutuhanKhusus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      KebutuhanKhusus.hasMany(models.TerlaporKhusus, {
        foreignKey: 'kebutuhanKhususId'
      });
    }
  }
  KebutuhanKhusus.init({
    namaKebutuhanKhusus: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'KebutuhanKhusus',
  });
  return KebutuhanKhusus;
};