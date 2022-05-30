const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

app.listen(8080, () => {
  console.log("Server is running on port 8080");

  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      app.use("/auth", authRoutes);
    })
    .catch((err) => {
      console.log(err);
    });
});
