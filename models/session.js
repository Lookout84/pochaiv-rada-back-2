"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    //   Session.hasMany(models.Author, {
    //     foreignKey: "author",
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE",
    //   });
    //   Session.hasMany(models.Variation, {
    //     foreignKey: "variation",
    //     onDelete: "CASCADE",
    //     onUpdate: "CASCADE",
    //   });
    // }
  }
  Session.init(
    {
      title: DataTypes.STRING,
      text: DataTypes.STRING,
      author: DataTypes.STRING,
      variation: DataTypes.STRING,
      date: DataTypes.DATE,
      numberSession: DataTypes.INTEGER,
      file: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Session",
    }
  );
  return Session;
};
