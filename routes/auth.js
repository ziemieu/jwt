const router = require("express").Router();
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../validation");
const { required } = require("@hapi/joi");

//REGISTER VALIDATION
router.post("/register", async (req, res) => {
  //LET VALIDATE THE DATA BEFORE WE USE IT
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the User is already in the DataBase
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res
      .status(400)
      .send({ message: "User with this email already exist" });

  //Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

//LOGIN VALIDATION
router.post("/login", async (req, res) => {
  //LET VALIDATE THE DATA BEFORE WE USE IT
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Check if the email is in the DataBase
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res
      .status(400)
      .send({ message: "User with this email is not found" });

  //Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.status(400).send({ message: "This passord is not correct" });

  //Create and Assign token

  const privateKey = require("../config/db.config").key;
  const token = jwt.sign({ _id: user._id }, privateKey);
  res.header("auth-token", token).send(token);
  //res.send({ success: "Logged in" });
});

module.exports = router;

//// For the new version

// const schema = Joi.object({ name: Joi.string() .min(6) .required(),
// email: Joi.string() .min(6) .required() .email(),
// password: Joi.string() .min(6) .required() });

// const validation = schema.validate(req.body);
// res.send(validation);
