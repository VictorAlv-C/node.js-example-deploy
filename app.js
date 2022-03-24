const express = require("express");

//Routes
const { postRouter } = require("./routes/posts.routes");
const { usersRouter } = require("./routes/users.routes");
const { commentRouter } = require("./routes/comments.routes");

const { globalErrorHandler } = require("./controllers/error.controller");
const { AppError } = require("./utils/AppError");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

app.use("*", (req, res, next) => {
  next(new AppError(404, `${req.originalUrl} not found in this server.`));
});

app.use(globalErrorHandler);

module.exports = { app };
