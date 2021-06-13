const express = require('express');
const router = express.Router();
const CardControllers = require("../controllers/card");
const authentication = require("../middlewares/checkAuth");

router.get("/", authentication, CardControllers.findAll);
router.post("/", authentication, CardControllers.insert);
router.put("/:id", authentication, CardControllers.update);
router.delete("/:id", authentication, CardControllers.destroy);

module.exports = router;
