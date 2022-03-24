const express = require("express");

const router = express.Router();

//Controllers
const {
  getAllPost,
  getPostById,
  savePost,
  updatePostPut,
  updatePostPatch,
  deletePost,
} = require("../controllers/posts.controller");

const { validateSession } = require("../middlewares/auth.middleware");
const { upload } = require("../utils/multer");

router.use(validateSession);

// Get all posts
router.get("", getAllPost);

//Get post by Id
router.get("/:id", getPostById);

//Save post in to database
router.post("", upload.single("postImg"), savePost);

//Update post wiht Put
router.put("/:id", updatePostPut);

//Update post wiht Patch
router.patch("/:id", updatePostPatch);

//Delete post
router.delete("/:id", deletePost);

module.exports = { postRouter: router };
