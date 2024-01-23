const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const Joi = require("joi");
const passwordcomplexity = require("joi-password-complexity");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JSONKEY, {
    expiresIn: "7d",
  });
  return token;
};

const User = mongoose.model("User", UserSchema);
const validate = (data) => {
  const Schema = Joi.object({
    username: Joi.string().required().label("UserName"),
    email: Joi.string().email().required().label("Email"),
    password: passwordcomplexity().required().label("Password"),
  });
  return Schema.validate(data);
};

module.exports = { User, validate };
