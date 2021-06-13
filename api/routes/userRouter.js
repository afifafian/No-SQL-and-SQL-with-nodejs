const express = require('express');
const router = express.Router();
const UserControllers = require("../controllers/user");
const authentication = require("../middlewares/checkAuth");

router.post("/register", UserControllers.register);
router.post("/login", UserControllers.login);

router.get("/", authentication, UserControllers.findAll);
router.get("/detail", authentication, UserControllers.findOne);

module.exports = router;
