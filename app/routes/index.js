module.exports = function(app) {

	/**
	 * @api {get} / API Status
	 * @apiGroup Status
	 * @apiSuccess (200) {String} status API status message
	 * @apiSuccessExample {json} Sucesso:
	 * HTTP/1.1 200 OK
	   {
		   "status" : "API Exercise2"
	   }
	 */
	app.get("/", function(req, res) {
		res.json({status : "API Exercise2"});
	});
};