const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const { Op } = require("sequelize");
const models = require("../../models");

module.exports = asyncHandler(async (req, res) => {
	const courses = await models.course.findAll({
		where: {
			creatorId: {
				[Op.ne]: req.user.id
			}
		},
		include: {
			model: models.user,
			as: "mentor"
		}
  });
  
	return res.json({
		courses
	});
});
