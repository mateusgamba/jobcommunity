const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator/check");
const sendMail = require("../config/forgetPasswordMail");

const User = require("../models/User");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").not().isEmpty(),
  ],
  async (req, res) => {
    const message =
      "Your credentials do not match our records. Please try again.";

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const data = {};
      validation.array().map((err) => (data[err.param] = err.msg));

      return res.status(400).json({
        data,
        message,
      });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message });
      }

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

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post(
  "/forget",
  [check("email", "Email is required").not().isEmpty().isEmail()],
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

    const email = req.body.email;
    const nameProject = process.env.REACT_APP_NAME;
    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Email doesn't exist" });
      }

      const characters =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
      let reset_pass = "";
      for (let i = 0; i < 25; i++) {
        reset_pass += characters[Math.floor(Math.random() * characters.length)];
      }

      user = await User.findOneAndUpdate(
        { email: email },
        { $set: { reset: reset_pass } },
        { new: true }
      );

      const subject = `Reset password - ${nameProject}`;
      const userData = {
        name: user.name,
        reset: user.reset,
        nameProject,
      };

      const emailStatus = sendMail(email, subject, userData);

      emailStatus
        .then(() => {
          return res.json({
            message:
              "Your email has been sent successfully! You will receive an email with instructions on how to reset your password in a few minutes.",
          });
        })
        .catch(() => {
          return res.json(
            {
              message: "Something went wrong please contact via website.",
            },
            500
          );
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send(err.message);
    }
  }
);

router.post(
  "/reset-password",
  [
    check("reset", "Url token invalid").not().isEmpty(),
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

    const { password, reset } = req.body;

    try {
      let user = await User.findOne({ reset });

      if (!user) {
        return res.status(400).json({
          message: "Token invalid, please, resend password reset email",
        });
      }

      const salt = await bcrypt.genSalt(10);

      const userData = {
        password: await bcrypt.hash(password, salt),
        reset: null,
      };

      user = await User.findOneAndUpdate(
        { reset: reset },
        { $set: userData },
        { new: true }
      );

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

router.post(
  "/update-password",
  auth,
  [
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "newPassword",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
    check(
      "newPasswordConfirm",
      "Please enter a password with 6 or more characters"
    )
      .isLength({ min: 6 })
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
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

    const { password, newPassword } = req.body;

    try {
      let user = await User.findById(req.user.id);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Password Incorrect" });
      }

      const salt = await bcrypt.genSalt(10);

      const userData = {
        password: await bcrypt.hash(newPassword, salt),
      };

      user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $set: userData },
        { new: true }
      );

      return res.json({});
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
