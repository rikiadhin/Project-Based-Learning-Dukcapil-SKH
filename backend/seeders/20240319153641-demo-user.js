'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash("rikiadhin", 10);

    return queryInterface.bulkInsert('Users', [{
      idUser: userId,
      nama: 'Riki Adhi Nugroho',
      email: 'rikiadhin@gmail.com',
      password: hashedPassword,
      nomorWA: '081234567890',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
