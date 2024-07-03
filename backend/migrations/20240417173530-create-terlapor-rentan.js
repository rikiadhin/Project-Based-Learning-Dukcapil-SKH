'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TerlaporRentans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
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
      kerentananId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Kerentanans',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
    await queryInterface.dropTable('TerlaporRentans');
  }
};