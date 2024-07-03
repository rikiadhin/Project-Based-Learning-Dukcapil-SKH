'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perekaman extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Perekaman.belongsTo(models.Pelaporan, { foreignKey: 'pelaporanId', targetKey: 'id' });
      Perekaman.belongsTo(models.PetugasPerekaman, { foreignKey: 'petugasOne', foreignKey:'petugasTwo' });
    }
  }
  Perekaman.init({
    pelaporanId: DataTypes.INTEGER,
    petugasOne: DataTypes.INTEGER,
    petugasTwo: DataTypes.INTEGER,
    tanggalPerekaman: DataTypes.DATE,
    dokumenHasilPerekaman : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perekaman',
  });
  return Perekaman;
};