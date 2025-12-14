const convertRoutes = require("./ConvertOnline");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.json({ message: "🚀 Server is running!" });
  });
  app.use("/api", convertRoutes)
};
