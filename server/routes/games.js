const express = require("express");
const router = express.Router();

const gamesRouter = require("../controllers/games");
const admin = require("../middleware/admin");
const auth = require("../middleware/auth")

router.get("/", gamesRouter.getAllGames);

router.get("/:id", gamesRouter.getGameById);

// chranene routy (muze jen admin)

router.post("/", auth, admin, gamesRouter.createGame);

router.put("/:id", auth, admin, gamesRouter.updateGame);

router.delete("/:id", auth, admin, gamesRouter.deleteGame);

module.exports = router;
