const express = require("express");

//Routes
const { postRouter } = require("./routes/posts.routes");
const { usersRouter } = require("./routes/users.routes");
const { commentRouter } = require("./routes/comments.routes");

const app = express();

app.use(express.json());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.use((err, req, res, next) => {
  res.status(err.statuscode).json({
    message: err.message,
  });
});

module.exports = { app };
