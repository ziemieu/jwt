const jwt = require("jsonwebtoken");

//Function to verified token that can be use in other API
module.exports = function auth(req, res, next) {
  const token = req.header("auth-token");
  if (!token) res.status(401).send("Access Denied");

  try {
    const privateKey = require("../config/db.config").key;
    const verified = jwt.verify(token, privateKey);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};
