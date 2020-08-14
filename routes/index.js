var express = require("express");
var router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
var multer = require("multer");
const { start } = require("repl");
var upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), function (req, res, next) {
  const results = [];
  const input = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => input.push(data))
    .on("end", () => {
      fs.createReadStream("data_fix.csv")
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          for (let i = 0; i < input.length; i++) {
            let startIndex = results.findIndex(
              (data) => data.Date === input[i].startDate
            );
            let stopIndex = results.findIndex(
              (data) => data.Date === input[i].stopDate
            );
            let planet = input[i].planetNum;

            for (let j = startIndex; j < stopIndex; j++) {
              console.log(
                typeof parseInt(input[0].planetLong),
                typeof parseInt(results[j][planet])
              );
              console.log(
                "ini result",
                parseInt(input[0].planetLong) - parseInt(results[j][planet])
              );
            }
          }
        });
    });
});

module.exports = router;
