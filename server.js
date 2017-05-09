var config = require("./app/config/config")();
var http = require("http");
var app = require("./app/config/express")();
require("./app/config/database")(config.db);

http.createServer(app).listen(config.port, function() {
    console.log("Express Https Server: " +
        config.address +
        " (" + config.env +
        ") escutando na porta " + config.port);
});