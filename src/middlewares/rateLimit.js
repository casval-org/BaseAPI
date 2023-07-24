const rateLimit = require("express-rate-limit");

const allowList = ["::1"];

const apiLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes
  max: (req, res) => {
    if (req.url === "/login") return 5;
    if (req.url === "/register") return 5;
    return 100;
  },
  message: {
    success: false,
    message: "Too many, requests from this IP, please try again later",
  },
  skip: (req, res) => allowList.includes(req.ip),
  standartHeaders: true,
  legacyHeaders: true,
});

module.exports = apiLimiter;
