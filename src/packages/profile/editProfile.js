const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");
const getAuthUser = require("../auth/getAuthUser");

module.exports = asyncHandler(async (req, res) => {
	const { name, contact } = req.body;

	await models.user.update(
		{
			name,
			contact
		},
		{
			where: {
				id: req.user.id
			}
		}
	);

	const authUser = await getAuthUser(req.user.id);

	return res.status(StatusCodes.ACCEPTED).json({
		message: "Profile updated",
		user: authUser
	});
});
