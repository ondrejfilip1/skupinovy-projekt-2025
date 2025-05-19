const express = require("express");
const router = express.Router();
const userRouter = require("../controllers/user");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// prihlasi
router.post("/login", userRouter.login);

// zaregistruje + prihlasi
router.post("/register", userRouter.register);

// ziska vsechny uzivatele
router.get("/", auth, admin, userRouter.getAllUsers);

// smaze uzivatele
router.delete("/:id", auth, admin, userRouter.deleteUser);

module.exports = router;
