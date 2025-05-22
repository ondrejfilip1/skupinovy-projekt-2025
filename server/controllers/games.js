const Game = require("../models/games");

exports.getAllGames = async (req, res, next) => {
  try {
    const data = await Game.find();
    if (data && data.length !== 0) {
      return res.status(200).send({
        message: "Games found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Games not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.getGameById = async (req, res, next) => {
  try {
    const data = await Game.findById(req.params.id);
    if (data) {
      return res.status(200).send({
        message: "Game found",
        payload: data,
      });
    }
    res.status(404).send({
      message: "Game not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
exports.createGame = async (req, res, next) => {
  try {
    const data = new Game({
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      imagePath: req.body.imagePath,
      price: req.body.price,
    });
    const result = await data.save();
    if (result) {
      // update v realnem case pomoci socket.io (admin panel)
      const io = req.app.get("io");
      io.emit("gamesUpdated");

      return res.status(201).send({
        message: "Game created",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Game not found",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateGame = async (req, res, next) => {
  try {
    const data = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      imagePath: req.body.imagePath,
      price: req.body.price,
    };
    const result = await Game.findByIdAndUpdate(req.params.id, data);
    if (result) {
      // update v realnem case pomoci socket.io (admin panel)
      const io = req.app.get("io");
      io.emit("gamesUpdated");

      return res.status(200).send({
        message: "Game updated",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Game not updated",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteGame = async (req, res, next) => {
  try {
    const result = await Game.findByIdAndDelete(req.params.id);
    if (result) {
      // update v realnem case pomoci socket.io (admin panel)
      const io = req.app.get("io");
      io.emit("gamesUpdated");

      return res.status(200).send({
        message: "Game deleted",
        payload: result,
      });
    }
    res.status(500).send({
      message: "Game not deleted",
    });
  } catch (err) {
    res.status(500).send(err);
  }
};
