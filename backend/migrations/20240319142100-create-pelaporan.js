'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pelaporans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kodePelaporan: {
        type: Sequelize.STRING, 
        unique: true
      },
      terlaporId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Terlapors',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      tanggalPelaporan: {
        type: Sequelize.DATE,
        // allowNull : false
      },
      statusLayanan: {
        type: Sequelize.STRING,
        // allowNull : false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pelaporans');
  }
};