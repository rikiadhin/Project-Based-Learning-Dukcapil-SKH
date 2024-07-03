'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Perekamans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pelaporanId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pelaporans',
          key : 'id'
        },
        onDelete: 'cascade',
        onUpdate : 'cascade' 
      },
      petugasOne: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PetugasPerekamans',
          key : 'id'
        },
        onDelete: 'cascade',
        onUpdate : 'cascade'
      },
      petugasTwo: {
        type: Sequelize.INTEGER,
        references: {
          model: 'PetugasPerekamans',
          key : 'id'
        },
        onDelete: 'cascade',
        onUpdate : 'cascade'
      },
      tanggalPerekaman: {
        type: Sequelize.DATE
      },
      dokumenHasilPerekaman : {
        type:Sequelize.STRING
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
    await queryInterface.dropTable('Perekamans');
  }
};

