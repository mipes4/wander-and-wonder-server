const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const Player = require("../models/").player;
const Score = require("../models/").score;
const Category = require("../models/").category;
const { SALT_ROUNDS } = require("../config/constants");
const sequelize = require("sequelize");
const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const score = await Score.findAll({
      include: { model: Category },
    });
    res.send(score);
  } catch (e) {
    next(e);
  }
});

router.get("/category/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const score = await Score.findAll({ where: { categoryId: id } });
    res.send(score);
  } catch (e) {
    next(e);
  }
});

router.get("/player/:playerId", async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const score = await Score.findAll({ where: { playerId } });
    res.send(score);
  } catch (e) {
    next(e);
  }
});

router.post("/player/:playerId", async (req, res, next) => {
  try {
    const { playerId } = req.params;
    const { categoryId, score } = req.body;

    if (!categoryId || !playerId) {
      response.status(400).send("Must provide title and amount for expense");
    } else {
      const newScore = await Score.create({
        playerId,
        categoryId,
        score,
      });

      const maxScore = await Score.findOne({
        attributes: [[sequelize.fn("MAX", sequelize.col("score")), "maxScore"]],
        where: { playerId },
      });

      const highScore = await Player.findOne({
        attributes: ["highestScore"],
        where: { id: playerId },
      });

      if (maxScore.dataValues.maxScore > highScore.highestScore) {
        const newHigestScore = await Player.update(
          { highestScore: maxScore.dataValues.maxScore },
          { where: { id: playerId } }
        );
      }
      res.send(newScore);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
