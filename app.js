var express = require("express");
const mongoose = require("mongoose");
const app = express();
//const dotenv = require("dotenv"); // This saves our username and password when we push to hiroko(cloud)

//Middleware
//dotenv.config();
app.use(express.json());

//process.env.nameofdatain envfolder

const db = require("./config/db.config").url;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

//Import Routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

//Route Middlewares
app.use("/api/user", authRoute);
app.use("/api/post", postRoute);

app.listen(3000, () => console.log("Sever is running on Port 3000"));
