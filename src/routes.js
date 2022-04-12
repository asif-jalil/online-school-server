const authRoutes = require("./packages/auth/auth.route");
const profileRoute = require("./packages/profile/profile.route");

const routes = app => {
  app.use("/api/auth", authRoutes);
  app.use("/api/profile", profileRoute)
}

module.exports = routes;