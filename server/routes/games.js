const express = require('express');
const router = express.Router();

const gamesRouter = require("../controllers/games")

router.get('/', gamesRouter.getAllGames);

router.get('/:id', gamesRouter.getGameById);

router.post('/', gamesRouter.createGame);

router.put('/:id', gamesRouter.updateGame);

router.delete('/:id', gamesRouter.deleteGameCar);

module.exports = router;
