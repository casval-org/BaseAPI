const router = require("express").Router();

const { addPayment, cardList , saveNewCard, deleteCard} = require("../controllers/payment.controller");

router.post("/pay", addPayment);

router.post("/pay/card-list", cardList);

router.post("/pay/save-new-card", saveNewCard);

router.post("/pay/delete-card", deleteCard);

module.exports = router;
