const { Router } = require("express");
const isAuthenticated = require("../../middlewares/guard/isAuthenticated");
const { isValidated } = require("../../utils/validator");
const changePassword = require("./changePassword");
const changePasswordRules = require("./changePassword.rules");
const editProfile = require("./editProfile");
const editProfileRules = require("./editProfile.rules");


const profileRoutes = Router({ mergeParams: true });

// Update current users profile
profileRoutes.put("/",
  isAuthenticated,
  isValidated(editProfileRules),
  editProfile
)

// Update password
profileRoutes.put(
	"/password",
	isAuthenticated,
	isValidated(changePasswordRules),
	changePassword
);

module.exports = profileRoutes;