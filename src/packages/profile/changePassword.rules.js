const { body } = require("express-validator");
const { MIN_PASSWORD_LENGTH } = require("../../../config/app");

module.exports = [
	body("newPassword")
		.trim()
		.not()
		.isEmpty()
		.withMessage("New password is required")
		.bail()
		.isLength({ min: MIN_PASSWORD_LENGTH })
		.withMessage(
			`New password must be at least ${MIN_PASSWORD_LENGTH} chars long`
		),
	body("confirmNewPassword")
		.trim()
		.not()
		.isEmpty()
		.withMessage("Confirm new password is required")
		.bail()
		.custom((value, { req }) => value === req.body.newPassword)
		.withMessage("Confirm new password does not match")
];
