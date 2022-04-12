const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const models = require("../../models");
const generateAuthToken = require("../../utils/auth/generateAuthToken");
const { APPROVED, STUDENT } = require("../../utils/const");
const getAuthUser = require("./getAuthUser");

module.exports = asyncHandler(async (req, res) => { 
  const { email, password, role, name } = req.body;

	const user = await models.user.create({
		email,
    password,
    role: role || STUDENT,
    name,
		status: APPROVED
	});

	const authToken = generateAuthToken(user);
	const authUser = await getAuthUser(user.id);

	return res.status(StatusCodes.CREATED).json({
		token: authToken,
		user: authUser
	});
})