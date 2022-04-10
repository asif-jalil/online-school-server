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

module.exports = {
	isValidated
};
