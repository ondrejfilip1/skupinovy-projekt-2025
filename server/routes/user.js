const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/user");

router.post("/login", userRouter.login);

router.post("/register", userRouter.register);

module.exports = router;