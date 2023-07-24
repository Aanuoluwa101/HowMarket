const express = require("express")
const router = express.Router()
const { isAuth } = require("../middlewares/auth")
const { loginStatus, registerUser, loginUser, sessionInfo, logout } = require("../handlers/userHandler")

//all public
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").post(logout)
router.route("/login_status").get(loginStatus)
router.route("/session").get(sessionInfo)

module.exports = router;