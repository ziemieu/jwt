const router = require("express").Router();
const { request } = require("express");
const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.send(request.user);
});

module.exports = router;
