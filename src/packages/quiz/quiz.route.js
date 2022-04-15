const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { TEACHER, STUDENT } = require("../../utils/const");
const { isValidated } = require("../../utils/validator");
const create = require("./create");
const createRules = require("./create.rules");
const exam = require("./exam");
const quizzes = require("./quizzes");

const quizRoutes = Router();

// Create quiz
quizRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized([TEACHER]),
	isValidated(createRules),
	create
);

// Get quiz
quizRoutes.get("/:courseId", isAuthenticated, quizzes)

// Take exam
quizRoutes.post("/exam", isAuthenticated, isAuthorized([TEACHER, STUDENT]), exam)

module.exports = quizRoutes;
