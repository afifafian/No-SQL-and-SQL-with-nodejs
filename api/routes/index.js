const express = require('express');
const router = express.Router();
const userRouter = require("./userRouter");
const cardRouter = require("./cardRouter");
const historyRouter = require("./historyRouter");

router.use("/users", userRouter);
router.use("/card", cardRouter);
router.use("/history", historyRouter);

module.exports = router;
