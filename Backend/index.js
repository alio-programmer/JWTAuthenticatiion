const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

dotenv.config();

//server connection
const app = express();

app.listen(process.env.PORT, () => {
  console.log(`server listening on port: http://localhost:${process.env.PORT}`);
});

//data connection
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", userRoute);
app.use("/api/auth", authRoute);

app.get("/", (req, res) => {
  res.status(200).json("hello world");
});
