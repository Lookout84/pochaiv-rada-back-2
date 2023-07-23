'use strict';
// const { Author } = require('../src/helpers/constants');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Authors', [{
      name: 'Сергій Максимчук',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Андрій Чубик',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Наталія Совбецька',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Сергій Мамчур',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Віктор Лівінюк',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Богдан Касаткін',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Марія Коношевська',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Тетяна Нечай',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Олександр Петровський',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Галина Бондар',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Ольга Боцюк',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Інна Яра',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Сергій Пастощук',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'Сергій Лисак',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Authors', null, {});
  }
};
