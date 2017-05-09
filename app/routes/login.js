module.exports = function(app) {
	var controller = app.controllers.loginController;

	/**
	 * @api {post} /login Authenticated Token
	 * @apiGroup Login
	 * @apiParam  {String} email Email of person
	 * @apiParam  {String} password Person's password
	 * @apiSuccess (200) {String} token Token authenticated user
	 * @apiParamExample  {json} Input:
	   {
		   "email" : "myEmail@hotmail.com"
		   "password" : "myPassword"
	   }
	 * @apiSuccessExample {json} Success:
	 * HTTP/1.1 200 OK
	   {
		   "token" : "xyz.abc.123.hgf"
	   }
	 * @apiErrorExample {json} Authentication error:
	   		HTTP/1.1 401 Unauthorized
		 @apiErrorExample {json} Error logging in:
				HTTP/1.1 500 Internal Server Error
	 */
	app.post("/login", controller.login);
};