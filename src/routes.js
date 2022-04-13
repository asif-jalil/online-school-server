const authRoutes = require("./packages/auth/auth.route");
const courseRoutes = require("./packages/course/course.route");
const managementRoutes = require("./packages/management/management.route");
const profileRoute = require("./packages/profile/profile.route");

const routes = app => {
	app.use("/api/auth", authRoutes);
	app.use("/api/profile", profileRoute);
	app.use("/api/management", managementRoutes);
	app.use("/api/course", courseRoutes);
};

module.exports = routes;
