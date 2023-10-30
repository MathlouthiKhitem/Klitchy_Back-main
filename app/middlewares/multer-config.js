const multer = require("multer");
const { diskStorage } = require("multer");
const { join, dirname, extname } = require("path");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

function configureMulter(image, size) {
  return multer({
    storage: diskStorage({
      destination: (req, file, callback) => {
        const __dirname = dirname(__filename);
        callback(null, join(__dirname, "../public/images"));
      },
      filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        let newFileName = +new Date() + extname(file.originalname);
        callback(null, newFileName);
      },
    }),
    limits: size,
  }).single(image);
}

module.exports = configureMulter;
