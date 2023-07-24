const router = require("express").Router();
const APIError = require("../utils/errors");
const multer = require("multer");
const upload = require("../middlewares/lib/upload");
const auth = require("./auth.routes");
const Response = require("../utils/response");

router.use(auth);

router.post("/upload", function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError)
      throw new APIError("Multer error while uploading image : ", err);
    else if (err) throw new APIError("Error while uploading image : ", err);
    else
      return new Response(
        req.savedImages,
        "Image upload complated succesfully"
      ).success(res);
  });
});

module.exports = router;
