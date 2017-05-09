var mongoose = require("mongoose");
var logger = require("../logger");

module.exports = function(uri) {
	mongoose.Promise = global.Promise;

	mongoose.connect(uri, { server: { poolSize: 15 }});
	mongoose.connection.on("connected", function () {
	  console.log("Mongoose! Connectado em " + uri);
	});

	mongoose.connection.on("error",function (err) {
	  console.log("Mongoose! Erro na conexão: " + err);
	});

	mongoose.connection.on("disconnected", function () {
	  console.log("Mongoose! Desconectado de " + uri);
	});

	process.on("SIGINT", function() {
	  mongoose.connection.close(function () {
	    console.log("Mongoose! Desconectado pelo término aplicação");
	    process.exit(0);
	  });
	});

	mongoose.set('debug', function(coll, method, query, doc, options) {
		logger.info("collection: " + coll.toUpperCase() + ", method: " + method.toUpperCase() + ", query: " + JSON.stringify(query));
});
}