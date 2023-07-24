class Response {
  constructor(data = null, message = null) {
    this.message = message;
    this.data = data;
  }

  success(res) {
    return res.status(200).json({
      success: true,
      message: this.message ?? "Success",
      data: this.data,
    });
  }
  created(res) {
    return res.status(201).json({
      success: true,
      message: this.message ?? "Created successfully",
      data: this.data,
    });
  }
  error500(res) {
    return res.status(500).json({
      success: false,
      message: this.message ?? "Internal Server Error",
      data: this.data,
    });
  }
  error400(res) {
    return res.status(400).json({
      success: false,
      message: this.message ?? "Bad Request",
      data: this.data,
    });
  }
  error401(res) {
    return res.status(401).json({
      success: false,
      message: this.message ?? "Unauthorized",
      data: this.data,
    });
  }
  error404(res) {
    return res.status(404).json({
      success: false,
      message: this.message ?? "Not Found",
      data: this.data,
    });
  }
  error429(res) {
    return res.status(429).json({
      success: false,
      message: this.message ?? "Too Many Requests",
      data: this.data,
    });
  }
}

module.exports = Response;
