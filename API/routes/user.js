const express = require("express");
const router = express.Router();

//signup
router.post("/signup", (req, res) => {
  console.log(req);
  res.status(200).json({
    msg: "signup request",
  });
});

module.exports = router;
