module.exports = function() {
	var nodeEnv = process.env.NODE_ENV;
	if (!nodeEnv) {
		nodeEnv = "development";
	}

	return require("./env/" + (nodeEnv+ ".js").replace(" ", ""));
}