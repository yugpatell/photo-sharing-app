const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.put(
  "/:user",
  body("firstName").isLength({ min: 3 }).withMessage("First name is invalid."),
  body("lastName").isLength({ min: 3 }).withMessage("Last name is invalid."),
  body("email").isEmail().withMessage("Email is invalid."),
  body("oldPassword")
    .isLength({ min: 6 })
    .withMessage("Old Password is invalid."),
  body("newPassword")
    .isLength({ min: 6 })
    .withMessage("New Password is invalid."),
  async (req, res) => {
    /* Throw errors if validation errors */
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

    let { user } = req.params;
    user = user.split("=")[1];

    let findUser = await User.findOne({ _id: user });

    const { firstName, lastName, email, oldPassword, newPassword } = req.body;

    const isMatch = await bcrypt.compare(oldPassword, findUser.password);

    if (!isMatch) {
      return res.status(400).json({
        errors: ["Old Password is incorrect."],
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    findUser = await User.findByIdAndUpdate(
      { _id: user },
      {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      }
    );

    const updatedUser = await User.findOne({ _id: user });

    res.json({ updatedUser });
  }
);

module.exports = router;
