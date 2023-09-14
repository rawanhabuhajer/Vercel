const express = require("express");
const { signup, signin } = require("../controllers/AuthConrtoller");

const router = express.Router();

// login route
router.post("/signin", signin);

// signup route
router.post("/signup", signup);

module.exports = router;
