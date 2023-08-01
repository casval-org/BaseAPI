const Iyzipay = require("iyzipay");
const { v4: uuidv4 } = require("uuid");
const Response = require("../utils/response");
const APIError = require("../utils/errors");
const payment = require("../models/payment.model");



const iyzipay = new Iyzipay({
  apiKey: process.env.API_KEY,
  secretKey: process.env.SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com",
});

const addPayment = async (req, res) => {
  const id = uuidv4();
  const { price, cardUserName, cardNumber, expireDate, cvc, registerCard, cardToken, cardUserKey, isSave } =
    req.body;

  const data = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: id,
    price,
    paidPrice: price,
    currency: "TRY",
    installment: "1",
    basketId: "B67832",
    paymentChannel: "WEB",
    paymentGroup: "PRODUCT",
    paymentCard: {
      cardHolderName: cardUserName,
      cardNumber: cardNumber,
      expireMonth: expireDate.split("/")[0],
      expireYear: "20" + expireDate.split("/")[1],
      cvc,
      registerCard: registerCard,
    },
    buyer: {
      id: "BY789",
      name: "John",
      surname: "Doe",
      gsmNumber: "+905350000000",
      email: "email@email.com",
      identityNumber: "74300864791",
      lastLoginDate: "2015-10-05 12:43:35",
      registrationDate: "2013-04-21 15:12:09",
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112",
      city: "Istanbul",
      country: "Turkey",
      zipCode: "34732",
    },
    shippingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    },
    billingAddress: {
      contactName: "Jane Doe",
      city: "Istanbul",
      country: "Turkey",
      address: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      zipCode: "34742",
    },
    basketItems: [
      {
        id: "BI101",
        name: "Binocular",
        category1: "Collectibles",
        category2: "Accessories",
        itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
        price,
      },
    ],
  };

  return new Promise(async (resolve, reject) => {
    iyzipay.payment.create(data, async function (err, result) {
      if (err)
        return reject({
          custom: true,
          status: 400,
          message: result.errorMessage || err.message,
        });

      const paymentSave = new payment({
        sendData: data,
        resultData: result,
      });

      await paymentSave.save().then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
        });

      if (result.status !== "success")
        return reject({
          custom: true,
          status: 400,
          message: result.errorMessage,
        });

      return resolve(
        new Response(result, "Payment completed successfully").success(res)
      );
    });
  });
};

module.exports = {
  addPayment,
};
