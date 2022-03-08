const { filterObj } = require("../utils/filterObj");

const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const { Comment } = require("../models/comment.model");

const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError");

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
  const { name, age, email } = req.body;

  if (
    !name ||
    !age ||
    !email ||
    name.length === 0 ||
    age.length === 0 ||
    email.length === 0
  ) {
    return next(new AppError(404, "Falta algun campo o esta vacio"));
  }

  await User.create({
    name,
    age,
    email,
  });

  res.status(201).json({
    stautus: "Success",
    message: "Se agrego correctamente",
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
