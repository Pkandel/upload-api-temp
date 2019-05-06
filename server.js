var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/Users/prakashk/projects/prakash/upload-multer/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
var upload = multer({ storage })

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.get('/', (req, res) => res.send('Hello World!'))

var uploadSingle = upload.single('avatar');

app.post('/profile', function(req, res, next) {
    uploadSingle(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading.
          } else if (err) {
            // An unknown error occurred when uploading.
          }
          return res.json({ message: 'Everything went fine. ' });
    })

    // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
  })

app.listen(3000, () => console.log('app is running in 3000 port'));