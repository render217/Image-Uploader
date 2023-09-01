const multer = require("multer");
const path = require("path");
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/images");
  },
  filename: (req, file, cb) => {
    cb(null, Math.random() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  console.log(ext)
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    cb(new Error("File type is not supported"),false);
    return;
  } else {
    cb(null, true);
  }
};

module.exports= multer({ storage: multer.diskStorage({}), fileFilter });
