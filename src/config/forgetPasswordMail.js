const nodemailer = require("nodemailer");
var hbs = require("nodemailer-express-handlebars");
var handlebars = require("express-handlebars");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const viewEngine = handlebars.create({
  partialsDir: "./views/email/",
  defaultLayout: false,
});

transporter.use(
  "compile",
  hbs({
    viewEngine,
    viewPath: "./views/email/",
  })
);

const sendMail = (email, subject, user) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    template: "forgetPassword",
    context: {
      name: user.name,
      hash: user.reset,
      url: process.env.REACT_APP_URL,
      nameProject: user.nameProject,
    },
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
