const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { courseId } = req.body;

	const isEnrolled = await models.enrollment.findOne({
		where: {
			userId: req.user.id,
			courseId: courseId
		}
	});

	if (isEnrolled) {
		return res.status(StatusCodes.BAD_REQUEST).json({
			message: "Already enrolled"
		});
	}

	await models.enrollment.create({
		userId: req.user.id,
		courseId: courseId
	});

	const course = await models.course.findOne({
		where: {
			id: courseId
		},
		include: {
			model: models.user,
			as: "mentor"
		}
	});

	return res.status(StatusCodes.CREATED).json({
		message: "Successfully enrolled",
		enrolledCourse: course
	});
});
