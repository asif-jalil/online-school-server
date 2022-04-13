const asyncHandler = require("express-async-handler");
const models = require("../../models");
const { TEACHER } = require("../../utils/const");

module.exports = asyncHandler(async (req, res) => {
	const teachers = await models.user.findAll({
		where: {
			role: TEACHER
		}
	});

	return res.json({ teachers });
});
