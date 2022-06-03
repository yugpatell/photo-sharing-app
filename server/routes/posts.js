const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require("../models/user");

router.post(
  "/createPost",
  body("author")
    .isLength({ min: 10 })
    .withMessage("Author ID must be at least 10 characters long"),
  body("title")
    .isLength({ min: 8 })
    .withMessage("Title must be atleast 8 characters long."),
  body("description")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long."),
  body("postPicture")
    .isLength({ min: 1 })
    .withMessage("No picture was uploaded."),
  async (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array().map((err) => {
          return err.msg;
        }),
        params: validationErrors.array().map((err) => {
          return err.param;
        }),
      });
    }

    const { author, title, description, date, postPicture } = req.body;
    const findUser = await User.findOne({ _id: author });

    const newPost = await Post.create({
      author: author,
      authorName: findUser.firstName + " " + findUser.lastName,
      authorProfilePicture: findUser.profilePicture,
      title: title,
      description: description,
      postPicture: postPicture,
    });

    res.status(200).json({ newPost });
  }
);

router.get("/", async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

module.exports = router;
