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

// zmena hesla pro uzivatele
router.put("/passwordChange", auth, userRouter.changePassword);

// zmena jmena pro uzivatele
router.put("/usernameChange", auth, userRouter.changeUsername);

// zmena role (admin nebo uzivatel)
router.put("/roleChange", auth, admin, userRouter.changeRole);

module.exports = router;
