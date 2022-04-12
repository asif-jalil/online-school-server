const { body } = require("express-validator");

module.exports = [
	body("name")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Name is required")
		.bail()
];
