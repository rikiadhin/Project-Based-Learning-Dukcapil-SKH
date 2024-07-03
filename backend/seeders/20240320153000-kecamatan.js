'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
     
    // ADA 12 KECAMATAN
    return queryInterface.bulkInsert('Kecamatans', [
      {
        kodeWilayahKec: '331101',
        namaKecamatan: 'Weru',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331102',
        namaKecamatan: 'Bulu',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331103',
        namaKecamatan: 'Tawangsari',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331104',
        namaKecamatan: 'Sukoharjo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331105',
        namaKecamatan: 'Nguter',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331106',
        namaKecamatan: 'Bendosari',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331107',
        namaKecamatan: 'Polokarto',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331108',
        namaKecamatan: 'Mojolaban',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331109',
        namaKecamatan: 'Grogol',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331110',
        namaKecamatan: 'Baki',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331111',
        namaKecamatan: 'Gatak',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        kodeWilayahKec: '331112',
        namaKecamatan: 'Kartasura',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down(queryInterface, Sequelize) { 
    return queryInterface.bulkDelete('Kecamatans', null, {});
  }
};
