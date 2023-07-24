const router = require("express").Router();
const {
  login,
  register,
  me,
  forgetPassword,
  resetCodeCheck,
  resetPassword,
  getAllUsers,
  getUserbyId,
  updateProfile,
  deleteUser,
} = require("../controllers/auth.controller");
const authValidation = require("../middlewares/validations/auth.validation");
const { tokenCheck } = require("../middlewares/auth");

router.post("/login", authValidation.login, login);

router.post("/register", authValidation.register, register);

router.get("/me", tokenCheck, me);

router.post("/forget-password", forgetPassword);

router.post("/reset-code-check", resetCodeCheck);

router.post("/reset-password", resetPassword);

router.patch("/update-profile/:id", updateProfile);

router.get("/get-user/:id", getUserbyId);

router.get("/get-users", getAllUsers);

router.delete("/delete-user/:id", deleteUser);




// router.get("/get-users", getUsers);



// get-all-users
// get-user/:id
// delete-user/:id
// update-profile/:id


module.exports = router;
