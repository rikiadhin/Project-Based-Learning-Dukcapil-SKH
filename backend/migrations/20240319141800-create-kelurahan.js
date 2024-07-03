'use strict';

// const { FOREIGNKEYS } = require('sequelize/types/query-types');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Kelurahans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kodeWilayahKel: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      kecamatanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kecamatans',
          key: 'kodeWilayahKec'
        },
        onDelete: 'cascade',
        onUpdate : 'cascade'
      },
      namaKelurahan: {
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
    await queryInterface.dropTable('Kelurahans');
  }
};