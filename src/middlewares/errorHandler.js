const APIError = require("../utils/errors");

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof APIError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  if (err.custom === true) {
    return res.status(err.statusCode || 400).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Something went wrong, please try again later!",
  });
};

module.exports = errorHandlerMiddleware;
