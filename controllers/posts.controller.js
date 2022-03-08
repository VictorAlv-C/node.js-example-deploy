const { filterObj } = require("../utils/filterObj");
//Model
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Comment } = require("../models/comment.model");

const { AppError } = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");

exports.getAllPost = catchAsync(async (req, res) => {
  const posts = await Post.findAll({
    where: { status: "active" },
    include: [{ model: User }, { model: Comment, include: [{ model: User }] }],
  });

  res.status(200).json({
    status: "sucess",
    data: {
      posts,
    },
  });
});

exports.getPostById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id, status: "active" },
    include: [{ model: User }],
  });

  if (!post) {
    return next(new AppError(404, "Post no found whit given ID"));
  }

  res.status(200).json({
    status: "Sucess",
    data: {
      post,
    },
  });
});

exports.savePost = catchAsync(async (req, res, next) => {
  const { title, content, userId } = req.body;

  if (
    !title ||
    !content ||
    !userId ||
    title.length === 0 ||
    content.length === 0 ||
    userId.length === 0
  ) {
    return next(400, "Must a invalid title or content or author");
  }

  const newPost = await Post.create({ title, content, userId });

  res.status(201).json({
    status: "Success",
    data: { newPost },
  });
});

exports.updatePostPut = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { title, content, userId } = req.body;

  if (
    !title ||
    !content ||
    !userId ||
    title.length === 0 ||
    content.length === 0 ||
    userId.length === 0
  ) {
    return next(new AppError(400, "Must a invalid title or content"));
  }

  const updatePost = await Post.findOne({ where: { id } });

  if (!updatePost) {
    return next(new AppError(404, "Cant this post, invalid ID"));
  }

  await updatePost.update({
    title,
    content,
    userId,
  });

  res.status(201).json({
    status: "Success",
    message: "Update success",
  });
});

exports.updatePostPatch = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const data = filterObj(req.body, "title", "content", "userId");

  if (Object.keys(data).length === 0) {
    return next(new AppError(404, "Data is empty"));
  }

  const post = await Post.findOne({ where: { id } });

  if (!post) {
    return next(new AppError(404, "Cant update post with given Id"));
  }

  await post.update({ ...data });

  res.status(204).json({ status: "Success" });
});

exports.deletePost = catchAsync(async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({ where: { id, status: "active" } });

  if (!post) {
    return next(new AppError(404, "Cant delete post whit given ID"));
  }

  await post.update({ status: "deleted" });

  res.status(200).json({
    status: "Success",
    data: { post },
  });
});
