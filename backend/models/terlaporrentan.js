'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TerlaporRentan extends Model {  
    static associate(models) {
      models.TerlaporRentan.belongsTo(models.Terlapor, { foreignKey: 'terlaporId', targetKey: 'id' }); 
      models.TerlaporRentan.belongsTo(models.Kerentanan, {  foreignKey: 'kerentananId', targetKey: 'id' });
    }
  }
  TerlaporRentan.init({
    terlaporId: DataTypes.INTEGER,
    kerentananId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TerlaporRentan',
  });
  return TerlaporRentan;
};