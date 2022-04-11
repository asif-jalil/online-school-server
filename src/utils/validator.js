const { validationResult } = require("express-validator");

const isValidated = rules => {
	return [
		rules,
		async (req, res, next) => {
			const errors = validationResult(req).formatWith(error => error.msg);

			if (!errors.isEmpty()) {
				return res
					.status(StatusCodes.UNPROCESSABLE_ENTITY)
					.json(errors.mapped());
			}

			next();
		}
	];
};

const minLengthMessage = (label, min) => {
	return `${label} must be minimum ${min} characters long`;
};

const maxLengthMessage = (label, max) => {
	return `${label} must be maximum ${max} characters long`;
};

module.exports = {
	isValidated,
	minLengthMessage,
	maxLengthMessage
};
