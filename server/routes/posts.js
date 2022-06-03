const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const router = require("./profile");

router.put(
  "/createPost",
  body("title").isLength({ min: 8 }),
  body("description").isLength({ min: 10 }),
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
  }
);

module.exports = router;
