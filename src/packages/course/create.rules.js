const { body } = require("express-validator");

module.exports = [
	body("name").trim().not().isEmpty().withMessage("Course name is required")
];
