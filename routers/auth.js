const bcrypt = require("bcrypt");
const { Router } = require("express");
const { toJWT } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");
const Player = require("../models/").player;
const { SALT_ROUNDS } = require("../config/constants");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Please provide both email and password" });
    }

    const player = await Player.findOne({ where: { email } });

    if (!player || !bcrypt.compareSync(password, player.password)) {
      return res.status(400).send({
        message: "Player with that email not found or password incorrect",
      });
    }

    delete player.dataValues["password"]; // don't send back the password hash
    const token = toJWT({ playerId: player.id });
    return res.status(200).send({ token, ...player.dataValues });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).send("Please provide an email, password and a name");
  }

  try {
    const newPlayer = await Player.create({
      email,
      password: bcrypt.hashSync(password, SALT_ROUNDS),
      name,
    });

    delete newPlayer.dataValues["password"]; // don't send back the password hash

    const token = toJWT({ playerId: newPlayer.id });

    res.status(201).json({ token, ...newPlayer.dataValues });
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res
        .status(400)
        .send({ message: "There is an existing account with this email" });
    }

    return res.status(400).send({ message: "Something went wrong, sorry" });
  }
});

// The /me endpoint can be used to:
// - get the players email & name using only their token
// - checking if a token is (still) valid
router.get("/me", authMiddleware, async (req, res) => {
  // don't send back the password hash
  delete req.player.dataValues["password"];
  res.status(200).send({ ...req.player.dataValues });
});

module.exports = router;
