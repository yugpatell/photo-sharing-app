const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment");
const cors = require("cors");
const corsOptions = {
  //origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.static(__dirname + "/build"));

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Server is running on port " + port);

  mongoose
    .connect(
      "mongodb+srv://yugpatel:yugpatel145@cluster0.ka417fw.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      app.use("/auth", authRoutes);
      app.use("/profile", profileRoutes);
      app.use("/posts", postRoutes);
      app.use("/comments", commentRoutes);
    })
    .catch((err) => {
      console.log(err);
    });
});
