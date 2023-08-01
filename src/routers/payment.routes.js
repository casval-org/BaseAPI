const router = require("express").Router();


const {addPayment} = require("../controllers/payment.controller");

router.post("/payment", addPayment);

module.exports = router;
