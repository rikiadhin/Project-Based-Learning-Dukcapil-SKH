'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Hubungans', [
      {
        statusHubungan: 'Keluarga',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusHubungan: 'Tetangga',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusHubungan: 'Petugas Panti',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusHubungan: 'Perangkat Desa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        statusHubungan: 'Lainnya',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Hubungans', null, {});
  }
};
