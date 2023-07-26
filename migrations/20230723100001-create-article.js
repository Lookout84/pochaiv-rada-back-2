"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      body: {
        type: Sequelize.STRING,
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: "Authors",
          key: "id",
        },
      },
      icon: {
        type: Sequelize.STRING,
      },
      date: {
        type: Sequelize.DATE,
      },
      hidden: {
        type: Sequelize.BOOLEAN,
        default: 1,
      },
      isFavorite: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Articles");
  },
};
