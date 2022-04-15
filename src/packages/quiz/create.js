const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { courseId, question, options } = req.body;

  if(options.length < 4){
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "All options are not created"
    })
  }

	const ques = await models.quizQuestion.create({
		courseId,
		question
	});

	const modifiedOptions = options.map(opt => ({ ...opt, questionId: ques.id }));

	await models.quizOption.bulkCreate(modifiedOptions);

	const answer = await models.quizOption.findOne({
		where: {
			answer: true,
			questionId: ques.id
		}
	});

	if (!answer) {
		await ques.destroy();

		return res.status(StatusCodes.BAD_GATEWAY).json({
			message: "You didn't choose any right answer"
		});
	}

	await models.quizAnswer.create({
		questionId: ques.id,
		optionId: answer.id
	});

	return res.status(StatusCodes.CREATED).json({
		message: "Question Added"
	});
});
