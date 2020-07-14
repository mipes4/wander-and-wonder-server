"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    static associate(models) {
      score.belongsTo(models.player);
      score.belongsTo(models.category);
    }
  }
  score.init(
    {
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "score",
    }
  );
  return score;
};
