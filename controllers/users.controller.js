const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const { filterObj } = require("../utils/filterObj");

const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError");
dotenv.config({ path: "./config.env" });

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: { status: "active" },
    include: [
      { model: Post, include: [{ model: Comment }] },
      { model: Comment, include: [{ model: Post }] },
    ],
  });
  res.status(200).json({
    stautus: "Success",
    data: { users },
  });
});

exports.getUserByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: { id, status: "active" },
    include: [{ model: Post }, { model: Comment, include: [{ model: Post }] }],
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError(404, "Cant get user whith given ID"));
  }
  res.status(201).json({
    stautus: "Success",
    data: { user },
  });
});

exports.saveUser = catchAsync(async (req, res, next) => {
  const { name, age, email, password } = req.body;

  if (
    !name ||
    !age ||
    !email ||
    !password ||
    name.length === 0 ||
    age.length === 0 ||
    email.length === 0
  ) {
    return next(new AppError(404, "Some propertie is empty"));
  }

  const salt = await bcrypt.genSalt(12);
  const passwordProtec = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    age,
    email,
    password: passwordProtec,
  });

  user.password = undefined;

  res.status(201).json({
    stautus: "Success",
    data: { user },
  });
});

exports.updateUserPut = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, age, email } = req.body;

  if (
    !name ||
    !age ||
    !email ||
    name.length === 0 ||
    age.length === 0 ||
    email.length === 0 ||
    id === -1
  ) {
    return next(new AppError(404, "Information or Id incorrects"));
  }

  const user = await User.findOne({ where: { id, status: "active" } });

  if (!user) {
    return next(new AppError(404, "Cant update user with given ID"));
  }

  await user.update({ name, age, email });

  res.status(201).json({
    status: "Success",
    message: "Update correct",
    data: { user },
  });
});

exports.updateUserPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = filterObj(req.body, "name", "age", "email");
  const user = await User.findOne({ where: { id, status: "active" } });

  if (!user) {
    return next(new AppError(404, "Cant update user with given Id"));
  }

  if (Object.keys(data).length === 0) {
    return next(new AppError(404, "Data is empty"));
  }

  await user.update({ ...data });

  res.status(201).json({
    status: "Success",
    message: "Correct",
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id, status: "active" } });

  if (!user) {
    return next(new AppError(404, "Cant delete user with given id"));
  }

  await user.update({ status: "deleted" });

  res.status(200).json({
    status: "Success",
    message: "Deleted success",
  });
});

exports.loginValidate = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email, status: "active" } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(400, "Invalid Credentials"));
  }

  const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });

  res.status(200).json({
    status: "Success",
    data: { token },
  });
});
