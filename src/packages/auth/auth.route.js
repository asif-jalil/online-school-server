const {Router} = require("express");
const isUnauthenticated = require("../../middlewares/guard/isUnauthenticated");
const { isValidated } = require("../../utils/validator");
const  login = require("./login");
const loginRules = require("./login.rules");

const authRoutes = Router();

// Sign in
authRoutes.post(
	"/login",
	isUnauthenticated,
	isValidated(loginRules),
	login
);

module.exports = authRoutes