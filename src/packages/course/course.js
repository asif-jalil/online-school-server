const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { domain } = req.params;

	const course = await models.course.findOne({
		where: {
			courseDomain: domain
		},
		include: {
			model: models.user,
			as: "mentor"
		}
	});

	if (!course) {
		return res.status(StatusCodes.NOT_FOUND).json({
			message: "Course not found"
		});
	}

	return res.json({
		course
	});
});
