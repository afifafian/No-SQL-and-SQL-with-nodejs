const express = require('express');
const router = express.Router();
const HistoryControllers = require("../controllers/history");
const authentication = require("../middlewares/checkAuth");

router.get("/", authentication, HistoryControllers.findAll);
router.get("/:id", authentication, HistoryControllers.findOne);

module.exports = router;
