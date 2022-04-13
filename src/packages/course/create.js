const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const { name } = req.body;

	const course = await models.course.create({
		name: name,
		creatorId: req.user.id
  });
  
  return res.status(StatusCodes.CREATED).json({
    message: "Course created",
    course
  })
});
