const asyncHandler = require("express-async-handler");
const models = require("../../models");
const { STUDENT } = require("../../utils/const");

module.exports = asyncHandler(async (req, res) => {
	const students = await models.user.findAll({
		where: {
			role: STUDENT
		}
	});

	return res.json({ students });
});
