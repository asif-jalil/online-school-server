const asyncHandler = require("express-async-handler");
const { Op, Sequelize } = require("sequelize");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { courseId, answer } = req.body;

	const totalMarks = await models.quizQuestion.count({
		where: {
			courseId: courseId
		}
	});

	const answerArr = Object.keys(answer).map(key => ({
		questionId: Number(key),
		optionId: answer[key]
	}));

	const result = await models.quizAnswer.findAll({
		where: {
			[Op.or]: answerArr
		}
	});

	res.json({
		totalMarks,
		result,
		obtainedMark: result.length
	});
});
