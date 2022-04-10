const { ADMIN, TEACHER, STUDENT } = require("../../utils/const");
const UnauthenticatedError = require("../../error/Unauthenticated.error");
const InvalidRequestError = require("../error/InvalidRequest.error");
const UnauthorizedError = require("../../error/Unauthorized.error");
const getBrandUserRole = require("../userBrand/getBrandUserRole");

module.exports = (...grantedRoles) =>
	async (req, res, next) => {
		if (!grantedRoles.length) grantedRoles = [ADMIN, TEACHER, STUDENT];

		if (!req.user?.id) {
			return next(new UnauthenticatedError("You need to sign in first"));
		}

		if (!req.params?.brandId) {
			return next(new InvalidRequestError("Missing required parameter: brand"));
		}

		const role = await getBrandUserRole(
			req.user.id,
			req.params.brandId,
			grantedRoles
		);

		if (!role) {
			return next(
				new UnauthorizedError("You are not authorized to perform this action")
			);
		}

		req.role = role;
		next();
	};