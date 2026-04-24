const express = require("express");

// const dbconnect = require("../config/dbconnect")
const flashCardController = require("../Controlers/flashCardController");
const {authMiddleware} = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/createFolder",authMiddleware,flashCardController.createFolder);
router.get("/getFolder",authMiddleware,flashCardController.getFolder);

module.exports = router;