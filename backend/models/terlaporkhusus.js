'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TerlaporKhusus extends Model { 
    static associate(models) { 
      models.TerlaporKhusus.belongsTo(models.Terlapor, { foreignKey: 'terlaporId', targetKey: 'id' }); 
      models.TerlaporKhusus.belongsTo(models.KebutuhanKhusus, { foreignKey: 'kebutuhanKhususId', targetKey: 'id' });
    }
  }
  TerlaporKhusus.init({
    terlaporId: DataTypes.INTEGER,
    kebutuhanKhususId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TerlaporKhusus',
  });
  return TerlaporKhusus;
}; 