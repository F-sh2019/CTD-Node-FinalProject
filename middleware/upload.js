
const multer = require('multer');
const path = require('path');

// Configure storage for images and documents
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Save uploads in the "uploads" folder – ensure this folder exists
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Use a timestamp to avoid filename collisions
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
