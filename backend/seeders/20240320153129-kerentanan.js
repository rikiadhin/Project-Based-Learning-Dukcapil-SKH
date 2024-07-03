'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
     
    return queryInterface.bulkInsert('Kerentanans', [
      { 
        namakerentanan: 'Lansia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        namakerentanan: 'ODGJ',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      { 
        namakerentanan: ' Disabilitas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) { 
    return queryInterface.bulkDelete('Kerentanans', null, {});
  }
};
