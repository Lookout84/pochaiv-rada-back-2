'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Sessions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Authors',
          key: 'id'
        }
      },
      variation: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Variations',
          key: 'id'
        }
      },
      date: {
        type: Sequelize.DATE
      },
      numberSession: {
        type: Sequelize.INTEGER
      },
      file: {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('Sessions');
  }
};