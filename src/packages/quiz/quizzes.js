const asyncHandler = require("express-async-handler");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { courseId } = req.params;

	const quizzes = await models.quizQuestion.findAll({
		where: {
			courseId
		},
		include: {
			model: models.quizOption,
			as: "options"
		}
	});

	return res.json({
		quizzes
	});
});
