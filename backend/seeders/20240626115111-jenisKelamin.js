'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('JenisKelamins', [
      {
        jenisKelamin: 'Laki - laki',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        jenisKelamin: 'Perempuan',
        createdAt: new Date(),
        updatedAt: new Date()
      } 
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('JenisKelamins', null, {});
  }
};
