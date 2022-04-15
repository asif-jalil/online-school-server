const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { TEACHER, STUDENT } = require("../../utils/const");
const { isValidated } = require("../../utils/validator");
const course = require("./course");
const courses = require("./courses");
const create = require("./create");
const createRules = require("./create.rules");
const enroll = require("./enroll");

const courseRoutes = Router();

// Get course
courseRoutes.get("/", isAuthenticated, courses);

// Create course
courseRoutes.post(
	"/",
	isAuthenticated,
	isAuthorized([TEACHER]),
	isValidated(createRules),
	create
);

// Get course by domain
courseRoutes.get("/:domain", isAuthenticated, course);

// Course enrollment
courseRoutes.post(
	"/enroll",
	isAuthenticated,
	isAuthorized([TEACHER, STUDENT]),
	enroll
);

module.exports = courseRoutes;
