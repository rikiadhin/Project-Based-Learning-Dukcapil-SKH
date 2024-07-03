'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
 
    return queryInterface.bulkInsert('kebutuhankhusus', [
      {
        namakebutuhankhusus: 'Tunenetra',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        namakebutuhankhusus: 'Tunawicara',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        namakebutuhankhusus: 'Tunarungu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ])
  },

  async down (queryInterface, Sequelize) {
     
    return queryInterface.bulkDelete('kebutuhankhusus', null, {});
  }
};
