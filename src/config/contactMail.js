const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const handlebars = require("express-handlebars");
const validateEmail = require("../helper/validateEmail");

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
  defaultLayout: false
});

transporter.use(
  "compile",
  hbs({
    viewEngine,
    viewPath: "./views/email/"
  })
);

const sendMail = (email, subject, data) => {
  const message = data.message;
  const to = validateEmail(email) ? email : 'test@mytestjobcommunity.com';
  const mailOptions = {
    from: data.email,
    to,
    subject,
    template: "contact",
    context: {
      name: data.name,
      email: data.email,
      message: message.replace("\n", "<br />"),
      nameProject: data.nameProject,
    },
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendMail;
