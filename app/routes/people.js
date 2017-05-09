module.exports = function(app) {
    var controller = app.controllers.peopleController;

    app.route("/people")

        /**
         * @api {get} /people Displays all registered people
         * @apiGroup People
         * @apiSuccess (200) {json} people People registered
         * @apiSuccessExample {json} Success:
           [
            {
               "name" : "Person1"
               "email" : "person1@hotmail.com"
            },
            {
               "name" : "Person2"
               "email" : "person2@hotmail.com"
            },
            {
               "name" : "Person3"
               "email" : "person3@hotmail.com"
            }
            ]
         */
        .get(controller.getPeople)

        /**
         * @api {post} /people Join a new person
         * @apiGroup People
         * @apiParam  {String} name Person's name (required)
         * @apiParam  {String} email Email of person (required)
         * @apiParam  {String} password Person's password (required)
         * @apiSuccess (201) {json} id Registered person ID
         * @apiParamExample  {json} Input:
           {
               "name" : "Person"
               "email" : "emailPerson@hotmail.com"
               "password" : "myPassword"
           }
         * @apiSuccessExample {json} Success:
         * HTTP/1.1 201 OK
           {
               "_id" : "123QWASDFasd"
           }
           @apiErrorExample {json} Error registering person:
               HTTP/1.1 500 Internal Server Error
         */
        .post(controller.insertPeople);

    /**
     * @api {get} /people?index=INDEX&size=SIZE Displays people registered with pagination
     * @apiGroup People
     * @apiParam  {Number} INDEX Page index
     * @apiParam  {Number} SIZE Number of results per page
     * @apiSuccess (200) {json} people People registered
     * @apiParamExample  {Number} Example of index:
       {
           index : 0
       }
     * @apiParamExample  {Number} Example size:
       {
           size : 2
       }
     * @apiSuccessExample {json} Success:
        [
        {
            "name" : "Person1"
            "email" : "person1@hotmail.com"
        },
        {
            "name" : "Person2"
            "email" : "person2@hotmail.com"
        }
        ]
     */
    app.get("/people?", controller.getPeople);

    app.route("/people/:id")

        /**
         * @apiDefine headerAndErrorsPeople
         * @apiHeader (200) {String} Authorization Token of person
         * @apiHeaderExample {json} Header:
             {"Authorization": "JWT xyz.abc.123.hgf"}
           @apiErrorExample {json} Person not found
           HTTP/1.1 404 Not Found
           @apiErrorExample {json} Unauthorized access
           HTTP/1.1 401 Unauthorized
         */

        /**
         * @api {get} /people:/id Displays the person by ID
         * @apiGroup People
         * @apiParam  {String} id ID of person
         * @apiParamExample  {String} Input:
           {
               "id" : "123QWASDFasd"
           }
         * @apiSuccess (200) {json} pessoa Person's data
         * @apiSuccessExample {json} Success:
         * HTTP/1.1 200 OK
           {
               "name" : "Person1"
               "email" : "person1@hotmail.com"
               "password" : "myPassword"
           }
         * @apiUse headerAndErrorsPeople
         */
        .get(app.auth.authenticate(), controller.getPeopleById)

        /**
         * @api {put} /people/:id Update person by ID
         * @apiGroup People
         * @apiParam  {String} id ID of person
         * @apiParamExample  {json} Input:
           {
               "name" : "Updated person"
               "email" : "updatedPerson@hotmail.com"
               "password" : "myUpdatedPerson"
           }
         * @apiSuccessExample {json} Sucess
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Error updating person
             HTTP/1.1 500 Internal Server Error
             @apiUse headerAndErrorsPeople
         */
        .put(app.auth.authenticate(), controller.updatePeople)

        /**
         * @api {delete} /people/:id Deletes the person by the ID and all their contacts
         * @apiGroup People
         * @apiParam  {String} id ID of person
         * @apiParamExample  {String} Input:
           {
               "id" : "123QWASDFasd"
           }
         * @apiSuccessExample {json} Sucess
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Error deleting person
             HTTP/1.1 500 Internal Server Error
             @apiUse headerAndErrorsPeople
         */
        .delete(app.auth.authenticate(), controller.deletePeople);
};