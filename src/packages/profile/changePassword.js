const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");
const getAuthUser = require("../auth/getAuthUser");

module.exports = asyncHandler(async (req, res) => {
	const { newPassword } = req.body;
	
	const user = await models.user.findByPk(req.user.id);

	await user.update({
		password: newPassword
	});

	return res.status(StatusCodes.ACCEPTED).json({
		message: "Password updated"
	});
});
