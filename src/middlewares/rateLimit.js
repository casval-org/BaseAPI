const rateLimit = require("express-rate-limit");

const allowedList = ["::1"]; // Allowed IPs that can bypass time limits

const apiLimiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minute time limit
  max: (req, res) => {
    if (req.url === "/login") return 5;
    if (req.url === "/register") return 5;
    return 100;
  }, //Duration datas are stored on memory, so it is going to be resetted after every restart. To avoid resets to the time limit, these datas can be stored in some sort of database. 
  message: {
    success: false,
    message: "Too many requests, please try again later!",
  },
  skip: (req, res) => allowedList.includes(req.ip), //Checking for allowed ip adresses
  standartHeaders: true,
  legacyHeaders: true,
});

module.exports = apiLimiter;
