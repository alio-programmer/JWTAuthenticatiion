const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    //we could have used array destructuring here to make it easy but I didn't used it for learning purpose
    return res.status(415).json("all fields necessary");
  }
  const checkUser = await User.findOne({ username });
  if (checkUser) {
    return res.status(413).send("username already in use");
  }
  const checkEmail = await User.findOne({ email });
  if (checkEmail) {
    return res.status(412).send("User with current email already exists");
  }
  const salt = await bcrypt.genSalt(Number(process.env.SECRET_KEY));
  const hashpassword = await bcrypt.hash(req.body.password, salt);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashpassword,
  });
  try {
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
