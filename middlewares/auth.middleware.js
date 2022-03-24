const { catchAsync } = require("../utils/catchAsync");
const { AppError } = require("../utils/AppError");
const jwt = require("jsonwebtoken");
//const { promisify } = require("util");
const { User } = require("../models/user.model");

exports.validateSession = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(new AppError(400, "Invalid Session"));
  }

  const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

  //   const verifyToken = await promisify(jwt.verify)(
  //     token,
  //     process.env.JWT_SECRET
  //   );

  const user = await User.findOne({
    where: { id: verifyToken.id, status: "active" },
    attributes: { exclude: ["password"] },
  });

  if (!user) {
    return next(new AppError(401, "Invalid session"));
  }

  req.currentUser = user;

  next();
});
