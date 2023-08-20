const Iyzipay = require("iyzipay");
const { v4: uuidv4 } = require("uuid");
const Response = require("../utils/response");
const APIError = require("../utils/errors");
const payment = require("../models/payment.model");

const iyzipay = new Iyzipay({
  apiKey: process.env.PAYMENT_API_KEY,
  secretKey: process.env.PAYMENT_SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com",
});

const addPayment = async (req, res) => {
  const id = uuidv4();
  const {
    price,
    cardHolderName,
    cardNumber,
    expireDate,
    cvc,
    registerCard,
    cardToken,
    cardUserKey,
  } = req.body;
  const user = req.user;
  let data = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: id,
    price,
    paidPrice: price,
    currency: "TRY",
    installment: "1",
    paymentChannel: "WEB",
    paymentGroup: "PRODUCT",
    buyer: {
      // Removed unrequired fields and added database user integration
      id: user._id.toString(),
      name: user.name,
      surname: user.lastname,
      email: user.email,
      identityNumber: "12345678910", // ID Number of the buyer (Real Life Governmental ID)
      registrationAddress: "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1",
      ip: "85.34.78.112", //Can be added later to the user data
      city: "Istanbul", //Can be added later to the user data
      country: "Turkey", //Can be added later to the user data
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

  //Saved Card Integration
  if (cardToken && cardUserKey) {
    data.paymentCard = {
      cardToken,
      cardUserKey,
      price,
    };
  } else if (!cardToken && !cardUserKey) {
    data.paymentCard = {
      cardHolderName,
      cardNumber,
      expireMonth: expireDate.split("/")[0],
      expireYear: "20" + expireDate.split("/")[1],
      cvc,
      registerCard,
    };
  } else {
    throw new APIError("Please Enter A Valid Payment Method");
  }

  return new Promise(async (resolve, reject) => {
    iyzipay.payment.create(data, async function (err, result) {
      if (err || result.status !== "success")
        return reject({
          custom: true,
          status: 400,
          message: result.errorMessage || err.message,
        });

      if (!req.user.cardUserKey) {
        req.user.cardUserKey = result.cardUserKey;
        await req.user.save().catch((err) => {
          console.log(err);
        });
      }

      const paymentSave = new payment({
        sendData: data,
        resultData: result,
      });

      await paymentSave
        .save()
        .then((response) => {
          //console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });

      return resolve(
        new Response(result, "Payment completed successfully").success(res)
      );
    });
  });
};

const cardList = async (req, res) => {
  //const { cardUserKey } = req.body;
  const cardUserKey = req.user.cardUserKey;
  return new Promise(async (resolve, reject) => {
    iyzipay.cardList.retrieve({ cardUserKey }, async function (err, result) {
      if (err || result.status !== "success")
        return reject({
          custom: true,
          status: 400,
          message: result.errorMessage || err.message,
        });

      result.cardDetails.map((item) => {
        item.cardUserKey = cardUserKey;
      });

      return resolve(
        new Response(
          result.cardDetails,
          "Card-List retrieved successfully"
        ).success(res)
      );
    });
  });
};

const saveNewCard = async (req, res) => {
  const {
    cardAlias,
    cardHolderName,
    cardNumber,
    expireDate,
    email,
    cardUserKey,
  } = req.body;

  const data = {
    locale: "tr",
    email,
    cardUserKey,
    card: {
      cardAlias,
      cardHolderName,
      cardNumber,
      expireMonth: expireDate.split("/")[0],
      expireYear: "20" + expireDate.split("/")[1],
    },
  };

  return new Promise(async (resolve, reject) => {
    iyzipay.card.create(data, async function (err, result) {
      if (err || result.status !== "success")
        return reject({
          custom: true,
          status: 400,
          message: result.errorMessage || err.message,
        });

      return resolve(
        new Response(result, "Successfully added a new card!").success(res)
      );
    });
  });
};

const deleteCard = async (req, res) => {
  const { cardToken, cardUserKey } = req.body;

  const data = {
    cardToken,
    cardUserKey,
    locale: "tr",
  };

  return new Promise(async (resolve, reject) => {
    iyzipay.card.delete(data, async function (err, result) {
      if (err || result.status !== "success")
        return reject({
          custom: true,
          status: 400,
          message: result.errorMessage || err.message,
        });

      return resolve(
        new Response(result, "Successfully deleted the card!").success(res)
      );
    });
  });
};

module.exports = {
  addPayment,
  cardList,
  saveNewCard,
  deleteCard,
};
