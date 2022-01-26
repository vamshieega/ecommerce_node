const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res, next) => {
  const newUser = new User({
    username: req.body.mobileNo,
    mobileNo: req.body.mobileNo,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
    console.log("error", err);
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.findOne({ mobileNo: req.body.mobileNo });
    !user && res.status(401).json("no username found");
    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );
    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    OriginalPassword !== req.body.password &&
      res.status(401).json("wrong password");

    // This jwt sign will send to the verify token details when user uses new token
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      {
        expiresIn: "3d",
      }
    );
    // We are removing the password in the user object
    const { password, ...others } = user._doc;
    //we are sending the accessToken to user
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    next(err);
    res.status(500).json(err);
  }
});

module.exports = router;
