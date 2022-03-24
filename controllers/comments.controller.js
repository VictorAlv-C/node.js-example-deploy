const { Comment } = require("../models/comment.model");
const { User } = require("../models/user.model");

const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

exports.getAllComments = catchAsync(async (req, res) => {
  const comments = await Comment.findAll({
    where: { status: "active" },
    include: [{ model: User }],
  });

  res.status(200).json({
    status: "Success",
    data: { comments },
  });
});

exports.getCommentByID = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const comment = await Comment.findOne({
    where: { id, status: "active" },
    include: [{ model: User }],
  });
  if (!comment) {
    return next(new AppError(404, "Cant find comment with given Id"));
  }
  res.status(200).json({
    satutus: "Success",
    data: { comment },
  });
});

exports.saveComment = catchAsync(async (req, res) => {
  const { text, postId } = req.body;
  if (!text || !postId || text.length === 0 || postId.length === 0) {
    return next(new AppError(404, "Some properties is empty or dont exist"));
  }
  await Comment.create({ text, postId, userId: req.currentUser.id });
  res.status(200).json({
    status: "Success",
    message: "comment made successfully",
  });
});
