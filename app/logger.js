var fs = require("fs");
var winston = require("winston");
var timestamp = require("time-stamp");

if (!fs.existsSync("logs")) {
  fs.mkdirSync("logs");
}

module.exports = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: "info",
      filename: "logs/app.log",
      maxsize: 1048576,
      maxFiles: 10,
      colorize: false,
      json: false,
      timestamp : function() {
          return timestamp("YYYY/MM/DD HH:mm:ss:ms");
      },
      formatter: function(options) {
        return options.timestamp() + " => " + (options.message ? options.message : "");
      }
    })
  ]
});
