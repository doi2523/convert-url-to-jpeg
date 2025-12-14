require("dotenv").config();
const express = require("express");
const cors = require("cors");
const routes = require("./src/routes");
const { logGroupWrapper, logInfo } = require("./src/utils/logEventUtils");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// Các middleware khác
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logGroupWrapper);

// Nạp các route vào ứng dụng
routes(app);

// Khởi động server
const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  logInfo("SERVER", `🚀 Backend đang chạy tại http://localhost:${PORT}`);
});
