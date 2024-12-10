var express = require('express');
var router = express.Router();
const multer  = require('multer')
const path = require('path')

/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('form.html');
});

const uploadDir = path.join(__dirname, '..', 'public', 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, uploadDir)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
  })

// Set up multer with file size and type validation
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 2 * 1024 * 1024  // Limit the file size to 2MB (2 * 1024 * 1024 bytes)
    },
    fileFilter: function (req, file, cb) {
      // Accept only PNG files by checking the MIME type
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);  // Accept the file
      } else {
        cb(new Error('Irudiak bakarrik onartzen dira'), false);  // Reject other files
      }
    }
  });

router.post('/', upload.single('avatar'), function (req, res, next) {
    console.log(req.file)
    // req.body will hold the text fields, if there were any
    res.send("Jasota")
})

module.exports = router;
