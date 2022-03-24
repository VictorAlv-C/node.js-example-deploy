const express = require("express");
const routes = express.Router();
const {
  getAllComments,
  getCommentByID,
  saveComment,
} = require("../controllers/comments.controller");

const { validateSession } = require("../middlewares/auth.middleware");

routes.use(validateSession);

routes.get("/", getAllComments);

routes.get("/:id", getCommentByID);

routes.post("/", saveComment);

module.exports = { commentRouter: routes };
