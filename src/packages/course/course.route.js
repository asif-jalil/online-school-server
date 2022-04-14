const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const isAuthorized = require("../../middlewares/guard/isAuthorized");
const { TEACHER } = require("../../utils/const");
const { isValidated } = require("../../utils/validator");
const course = require("./course");
const create = require("./create");
const createRules = require("./create.rules");

const courseRoutes = Router();

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

module.exports = courseRoutes;
