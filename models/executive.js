'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Executive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Executive.belongsTo(models.Author, {
        foreignKey: 'author',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      Executive.belongsTo(models.Variation, {
        foreignKey: 'variation',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Executive.init({
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    author: DataTypes.INTEGER,
    variation: DataTypes.INTEGER,
    date: DataTypes.DATE,
    numberSession: DataTypes.INTEGER,
    file: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Executive',
  });
  return Executive;
};