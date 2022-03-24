const multer = require("multer");
const { AppError } = require("../utils/AppError");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    const arrName = file.originalname.split(".");
    const ext = arrName.pop();
    const nameImg = arrName.join("-");

    file.customName = `${nameImg}-${Date.now()}.${ext}`;

    return cb(null, true);
  } else {
    return cb(new AppError(401, "Must provide an image as a file"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = { upload };
