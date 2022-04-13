const { ADMIN, TEACHER, STUDENT } = require("../../utils/const");
const UnauthenticatedError = require("../../error/Unauthenticated.error");
const UnauthorizedError = require("../../error/Unauthorized.error");
const getUserRole = require("../../packages/profile/getUserRole");

module.exports = (...grantedRoles) =>
	async (req, res, next) => {
		if (!grantedRoles.length) grantedRoles = [ADMIN, TEACHER, STUDENT];

		if (!req.user?.id) {
			return next(new UnauthenticatedError("You need to sign in first"));
		}

		const role = await getUserRole(
			req.user.id,
			req.params.brandId,
			...grantedRoles
		);

		if (!role) {
			return next(
				new UnauthorizedError("You are not authorized to perform this action")
			);
		}

		req.role = role;
		next();
	};