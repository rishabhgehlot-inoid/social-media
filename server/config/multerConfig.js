// const multer = require("multer");

// const storage = multer.diskStorage({
//   // destination: function (req, file, cb) {
//   //   cb(null, "./public");
//   // },
//   // filename: function (req, file, cb) {
//   //   const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//   //   cb(null, file.originalname + "-" + uniqueSuffix);
//   // },
// });

// exports.upload = multer({ storage: storage });

const multer = require("multer");
exports.upload = multer();
