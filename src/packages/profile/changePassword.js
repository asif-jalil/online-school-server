const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");
const getAuthUser = require("../auth/getAuthUser");

module.exports = asyncHandler(async (req, res) => {
	const { newPassword } = req.body;

	await models.user.update(
		{
			password: newPassword
		},
		{
			where: {
				id: req.user.id
			}
		}
	);

	return res.status(StatusCodes.ACCEPTED).json({
		message: "Password updated"
	});
});
