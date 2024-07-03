'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Terlapors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pelaporId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Pelapors',
          key : 'id'
        },
        onUpdate: 'cascade',
        onDelete : 'cascade'
      },
      namaTerlapor: {
        type: Sequelize.STRING,
        allowNull : false
      },
      jenisKelaminId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'JenisKelamins',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      namaIbuKandung: {
        type: Sequelize.STRING,
        allowNull: false
      },
      namaAyahKandung: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tempatLahir: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tanggalLahir: {
        type: Sequelize.DATE,
        allowNull: false
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: false
      },
      kelurahanId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kelurahans',
          key : 'id'
        }, 
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },  
      fotoWajah: {
        type: Sequelize.STRING
      },
      scanKK: {
        type: Sequelize.STRING
      },
      scanAkta: {
        type: Sequelize.STRING
      },
      scanIjazah: {
        type: Sequelize.STRING
      },
      scanKTP: {
        type: Sequelize.STRING
      },
      namaDokumenLain: {
        type: Sequelize.STRING,
      },
      scanDokumenLain: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Terlapors');
  }
};