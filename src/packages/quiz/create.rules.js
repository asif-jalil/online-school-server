const { body } = require("express-validator");

module.exports = [
	body("question").trim().not().isEmpty().withMessage("Question is required")
];