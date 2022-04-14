const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { TEACHER } = require("../../utils/const");
const { isValidated } = require("../../utils/validator");
const create = require("./create");
const createRules = require("./create.rules");

const quizRoutes = Router();

// Create quiz
quizRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized([TEACHER]),
	isValidated(createRules),
	create
);

module.exports = quizRoutes;
