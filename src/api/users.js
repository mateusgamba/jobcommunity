const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const User = require("../models/User");

// @route   POST api/users
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check("password2", "Please enter a password with 6 or more characters")
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
  ],
  async (req, res) => {
    const message =
      "Please check the fields and fix any errors before continuing";

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const data = {};
      validation.array().map((err) => (data[err.param] = err.msg));

      return res.status(400).json({
        data,
        message,
      });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (user) {
        return res.status(400).json({ message: "Email already exists" });
      }

      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "identicon",
      });

      user = new User({
        name,
        email,
        avatar,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) {
            throw err;
          }
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
