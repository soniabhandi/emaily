const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey],
  })
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app); //invokes authRoutes fn with app obj passed inside it

// app.get("/", (req, res) => {
//   res.send("hi there");
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT);
