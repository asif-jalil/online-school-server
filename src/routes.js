const authRoutes = require("./packages/auth/auth.route")

const routes = app => {
  app.use("/api/auth", authRoutes)
}

module.exports = routes;