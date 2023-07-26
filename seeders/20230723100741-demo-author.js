"use strict";
const { Author } = require("../src/helpers/constants");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Authors",
      [
        {
          name: Author.NAME1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME3,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME4,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME5,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME6,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME7,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME8,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME9,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME10,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME11,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME12,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME13,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: Author.NAME14,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Authors", null, {});
  },
};
