'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Article.belongsTo(models.User, {
        foreignKey: 'author',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
    }
  }
  Article.init({
    title: DataTypes.STRING,
    body: DataTypes.STRING,
    author: DataTypes.INTEGER,
    date: DataTypes.DATE,
    hidden: {type: DataTypes.BOOLEAN, default: 1},
    isFavorite: {type: DataTypes.BOOLEAN, default: 0}
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};