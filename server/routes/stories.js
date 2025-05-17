const express = require("express");
const router = express.Router();

const storiesRouter = require("../controllers/stories");
const auth = require("../middleware/auth");

// jen uzivatele muzou vytvaret pribehy
router.post("/create", auth, storiesRouter.createResponse);

module.exports = router;
