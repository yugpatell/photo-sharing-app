const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

router.put(
  "/user",
  body("firstName").isLength({ min: 3 }).withMessage("First name is invalid."),
  body("lastName").isLength({ min: 3 }).withMessage("Last name is invalid."),
  async (req, res) => {
    console.log(req.body);
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

    const { user } = req.params;
    const { firstName, lastName, email, oldPassword, newPassword } = req.body;
    const findUser = await User.findOne({ id: user });

    res.json({ findUser });
  }
);

module.exports = router;
