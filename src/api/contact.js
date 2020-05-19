const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const sendMail = require("../config/contactMail");

// @route   POST api/contact
// @desc    Register user
// @access  Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("message", "Message is required").not().isEmpty(),
  ],
  async (req, res) => {
    const messageError =
      "Please check the fields and fix any errors before continuing";

    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const data = {};
      validation.array().map((err) => (data[err.param] = err.msg));

      return res.status(400).json({
        data,
        message: messageError,
      });
    }

    const nameProject = process.env.REACT_APP_NAME;
    const emailUser = process.env.EMAIL_USER;

    const { name, email, message } = req.body;

    const subject = `Contact from ${nameProject}`;

    const emailData = {
      name,
      email,
      message,
      nameProject: nameProject,
    };

    try {
      const emailStatus = sendMail(emailUser, subject, emailData);

      emailStatus
        .then(() => {
          return res.json({
            message: "Your email has been sent successfully!",
          });
        })
        .catch((err) => {
          console.log("err: ", err);
          return res.json(
            {
              message: "Something went wrong please try again later.",
            },
            500
          );
        });
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
