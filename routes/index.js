var express = require('express');
var router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')
var multer = require('multer')
var upload = multer({ dest: 'uploads/' })

/* GET home page. */
router.post('/', upload.single('file'), function (req, res, next) {
  console.log(req.file)
  const results = [];
  const input = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on('data', (data) => input.push(data))
    .on('end', () => {
      console.log('oke');
      fs.createReadStream('data_fix.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
          console.log('ini input ==>', input[0])
        })
    });
})

module.exports = router;
