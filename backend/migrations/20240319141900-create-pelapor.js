'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pelapors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaPelapor: {
        type: Sequelize.STRING
      },
      nomorWA: {
        type: Sequelize.STRING
      },
      hubunganId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Hubungans',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete : 'cascade'
      },
      nomorNIK: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Pelapors');
  }
};