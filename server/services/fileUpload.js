const fs = require("fs");
const path = require("path");
const CONSTANTS = require("../config/constants");

const uploadFile = async (req, res) => {
  const originalFileName = req.file.originalname;
  const buffer = req.file.buffer;
  const fsize = req.file?.size;
  const file = Math.round(fsize);

  const isFileInvalidate = checkFileType(req.file);

  if (file >= 10000000) {
    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).send({
      status: false,
      data: {},
      message:
        "This file is too large and over 10MB please reduce the size and re-upload.",
    });
  } else if (isFileInvalidate) {
    return res.status(CONSTANTS.SERVER_OK_HTTP_CODE).send({
      status: false,
      data: {},
      message: "Please upload a valid image file.",
    });
  }

  saveOriginalFile(originalFileName, buffer);

  return true;
};

const checkFileType = function (file) {
  const fileTypes = /jpeg|jpg|png|gif|svg|bmp/;
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  if (extName) {
    return false;
  } else {
    return true;
  }
};

const saveOriginalFile = function (originalFileName, buffer) {
  const directory = "./public/user_uploads";
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  fs.writeFile(path.resolve(directory, originalFileName), buffer, (err) => {
    if (err) {
      console.error("Error writing image:", err);
    } else {
      console.log("Image downloaded");
    }
  });
};

module.exports = {
  uploadFile,
  saveOriginalFile,
};
