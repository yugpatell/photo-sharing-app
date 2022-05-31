const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const checkAuth = require("../checkAuth");

const User = require("../models/user");

router.post(
  "/signup",
  body("firstName").isLength({ min: 3 }).withMessage("First name is invalid."),
  body("lastName").isLength({ min: 3 }).withMessage("Last name is invalid."),
  body("email").isEmail().withMessage("Email is invalid."),
  body("password").isLength({ min: 6 }).withMessage("Password is invalid."),
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

    const { firstName, lastName, email, password } = req.body;
    const findUser = await User.findOne({ email: email });

    if (findUser) {
      return res.status(401).json({
        errors: ["Email already exists."],
      });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashedPassword,
    });

    const token = await jwt.sign(
      { email: newUser.email },
      `${process.env.JWT_SECRET_KEY}`,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  }
);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.findOne({ email: email });

  if (!findUser) {
    return res.status(401).json({
      errors: ["Email is not registered."],
    });
  }

  const isMatch = await bcrypt.compare(password, findUser.password);

  if (!isMatch) {
    return res.status(400).json({
      errors: ["Password is incorrect."],
    });
  }

  const token = await jwt.sign(
    { email: findUser.email },
    `${process.env.JWT_SECRET_KEY}`,
    {
      expiresIn: "1h",
    }
  );

  res.status(200).json({
    token,
    user: {
      id: findUser._id,
      firstName: findUser.firstName,
      lastName: findUser.lastName,
      email: findUser.email,
      profilePicture: findUser.profilePicture,
    },
  });
});

router.get("/me", checkAuth, async (req, res) => {
  const user = await User.findOne({ email: req.user });
  res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePicture: user.profilePicture,
    },
  });
});

module.exports = router;
