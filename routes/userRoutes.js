const express = require("express");

// const dbconnect = require("../config/dbconnect")
const authControlers = require("../Controlers/userControll");
const {authMiddleware} = require("../Middlewares/authMiddleware");
const router = express.Router();

router.get("/",authControlers.home)
router.post("/register",authControlers.register)
router.post("/login",authControlers.login);
router.get("/profile",authMiddleware,authControlers.profile);
router.post("/logout",authControlers.logout);


module.exports = router;