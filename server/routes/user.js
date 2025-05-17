const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

router.post("/login", userRouter.login);

router.post("/register", userRouter.register);

// ziska vsechny uzivatele
router.get("/", auth, admin, userRouter.getAllUsers);

module.exports = router;
