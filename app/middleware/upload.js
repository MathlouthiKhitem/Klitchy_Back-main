const multer = require("multer");



var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(req.body);
        cb(null, __basedir + "/resources/uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-klitchy-${file.originalname}`);
    },
});

var uploadFile = multer({ storage: storage });
module.exports = uploadFile;