const router = require("express").Router();

const { addPayment, cardList , saveNewCard, deleteCard} = require("../controllers/payment.controller");
const { tokenCheck } = require("../middlewares/auth"); //Token Check Before Every Payment Related Requests

router.post("/pay", tokenCheck, addPayment);

router.post("/pay/card-list", tokenCheck, cardList);

router.post("/pay/save-new-card", tokenCheck, saveNewCard);

router.post("/pay/delete-card", tokenCheck, deleteCard);

module.exports = router;
