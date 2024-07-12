const express = require("express");
const hbs = require("hbs");
const path = require('path');
const session = require('express-session');
const app = express();
require('dotenv').config();

require("./DB/conn");
const Register = require("./models/signupbk");

const port = process.env.PORT || 3000;

const templates_path = path.join(__dirname, "../templates/views");
const Partials_path = path.join(__dirname, "../templates/Partials");
const public_path = path.join(__dirname, "../public");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: process.env.NODE_ENV === 'production' }
})); //when we live webapp then change NODE_ENV = development to production

app.use(express.static(public_path));

app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(Partials_path);

const redirectLogin = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect('/Login');
  } else {
    next();
  }
};

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/Login", (req, res) => {
  res.render("Login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/weather", redirectLogin, (req, res) => {
  res.render("weather");
});


app.get("/Home", redirectLogin, (req, res) => {
  res.render("Home", { username: req.session.username, email: req.session.email });
});

app.post("/register", async (req, res) => {
  try {
    const Password = req.body.password;
    const Cpassword = req.body.confirmpassword;
    if (Password === Cpassword) {
      const registeruser = new Register({
        username: req.body.username,
        email: req.body.email,
        password: Password,
        confirmpassword: Cpassword
      });
      const registered = await registeruser.save();
      res.status(201).render("Login");
    } else {
      res.send("Passwords are not matching");
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/Login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await Register.findOne({ email: email });
    if (user) {
      if (user.password === password) {
        req.session.userId = user._id;
        req.session.username = user.username;
        req.session.email = user.email;
        res.redirect('/Home');
      } else {
        res.send("Invalid login details");
      }
    } else {
      res.send("Invalid login details");
    }
  } catch (error) {
    res.status(400).send("Invalid login details");
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.redirect('/Home');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.listen(port, () => {
  console.log('Server is running at port no', port);
});
