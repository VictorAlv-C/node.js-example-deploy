const express = require("express");
const router = express.Router();

//Controllers
const {
  getAllUsers,
  getUserByID,
  saveUser,
  updateUserPut,
  updateUserPatch,
  deleteUser,
  loginValidate,
} = require("../controllers/users.controller");

//Middleware
const { validateSession } = require("../middlewares/auth.middleware");

router.post("/", saveUser);

router.post("/login", loginValidate);

router.use(validateSession);

router.get("/", getAllUsers);

router.get("/:id", getUserByID);

router.put("/:id", updateUserPut);

router.patch("/:id", updateUserPatch);

router.delete("/:id", deleteUser);

module.exports = { usersRouter: router };
