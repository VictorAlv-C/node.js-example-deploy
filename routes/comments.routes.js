const express = require("express");
const routes = express.Router();
const {
  getAllComments,
  getCommentByID,
  saveComment,
} = require("../controllers/comments.controller");

routes.get("/", getAllComments);

routes.get("/:id", getCommentByID);

routes.post("/", saveComment);

module.exports = { commentRouter: routes };
