const router = require("express").Router();
const { User } = require("../models/User");
const dotenv = require("dotenv");
const Joi = require("joi");
const bcrypt = require("bcrypt");

dotenv.config();

router.post("/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send("Invalid Email");
    }
    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validpassword) {
      return res.status(401).send("invalid password");
    }

    const token = await user.generateAuthToken();
    res.status(200).send({ data: token, message: "Logged in successfully" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const validate = (data) => {
  const Schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = router;
