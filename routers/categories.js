const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const Player = require("../models/").player;
const Category = require("../models/").category;
const Score = require("../models/").score;

const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    const category = await Category.findAll();
    res.send(category);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
