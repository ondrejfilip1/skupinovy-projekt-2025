const express = require("express");
const router = express.Router();

const gamesRouter = require("../controllers/games");
const admin = require("../middleware/admin");

router.get("/", gamesRouter.getAllGames);

router.get("/:id", gamesRouter.getGameById);

// chranene routy (muze jen admin)

router.post("/", admin, gamesRouter.createGame);

router.put("/:id", admin, gamesRouter.updateGame);

router.delete("/:id", admin, gamesRouter.deleteGame);

module.exports = router;
