module.exports = function(app) {
    var controller = app.controllers.contactsController;

    app.route("/contacts")

        /**
         * @apiDefine headerAndErrorsContacts
         * @apiHeader (200) {String} Authorization Token da pessoa
         * @apiHeaderExample {json} Header:
             {"Authorization": "JWT xyz.abc.123.hgf"}
           @apiErrorExample {json} Acesso não autorizado
           HTTP/1.1 401 Unauthorized
         */

        /**
         * @api {get} /contacts Displays all contacts of the person
         * @apiGroup Contacts
         * @apiSuccess (200) {json} contacts Person contacts
         * @apiSuccessExample {json} Success:
           [
            {
               "name" : "Contact1"
               "phone" : "48999998888"
               "email" : "contact1@hotmail.com"
               "whatsapp" : "4899999999"
            },
            {
               "name" : "Contact2"
               "phone" : "3599998888"
               "email" : "contact2@hotmail.com"
               "whatsapp" : "3599999999"
            },
            {
               "name" : "Contact3"
               "phone" : "37999998888"
               "email" : "contact3@hotmail.com"
               "whatsapp" : "3766666666"
            }
            ]
            @apiUse headerAndErrorsContacts
         */
        .get(app.auth.authenticate(), controller.getContactsByPersonId)

        /**
         * @api {post} /contacts Sign up for a new contact
         * @apiGroup Contacts
         * @apiParam  {String} name Contact name (required)
         * @apiParam  {String} phone Contact phone
         * @apiParam  {String} email Contact email
         * @apiParam  {String} whatsapp Contact Whatsapp
         * @apiSuccess (201) {json} id Contact ID
         * @apiParamExample  {json} Input:
           {
               "name" : "Contact1"
               "phone" : "48999998888"
               "email" : "contact1@hotmail.com"
               "whatsapp" : "48777777777"
           }
         * @apiSuccessExample {json} Success:
         * HTTP/1.1 201 OK
           {
               "_id" : "123QWASDFasd"
           }
           @apiErrorExample {json} Error registering contact:
               HTTP/1.1 500 Internal Server Error
           @apiUse headerAndErrorsContacts
         */
        .post(app.auth.authenticate(), controller.insertContact);

    /**
     * @api {get} /contacts?index=INDEX&size=SIZE Displays the paged person's contacts
     * @apiGroup Contacts
     * @apiParam  {Number} INDEX Page index
     * @apiParam  {Number} SIZE Number of results per page
     * @apiSuccess (200) {json} contacts Person's contacts
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
               "name" : "Contact1"
               "phone" : "48999998888"
               "email" : "contact1@hotmail.com"
               "whatsapp" : "4899999999"
            },
            {
               "name" : "Contact2"
               "phone" : "3599998888"
               "email" : "contact2@hotmail.com"
               "whatsapp" : "3599999999"
            }
        ]
        @apiUse headerAndErrorsContacts
     */
    app.get("/contacts?", app.auth.authenticate(), controller.getContactsByPersonId);

    app.route("/contacts/:id")

        /**
         * @api {get} /contacts/:id Displays the person's contact by ID
         * @apiGroup Contacts
         * @apiParam  {String} id Contact ID
         * @apiParamExample  {String} Input:
           {
               "id" : "123QWASDFasd"
           }
         * @apiSuccess (200) {json} contact Contact data
         * @apiSuccessExample {json} Success:
         * HTTP/1.1 200 OK
           {
               "name" : "Contact1"
               "phone" : "48999998888"
               "email" : "contact1@hotmail.com"
               "whatsapp" : "4899999999"
           }
           @apiErrorExample {json} Contact not found
           HTTP/1.1 404 Not Found
           @apiUse headerAndErrorsContacts
         */
        .get(app.auth.authenticate(), controller.getContactById)

        /**
         * @api {put} /contacts/:id Update the contact by ID
         * @apiGroup Contacts
         * @apiParam  {String} id Contact ID
         * @apiParamExample  {json} Input:
           {
               "name" : "Updated Contact1"
               "phone" : "11222223333"
               "email" : "updatedContact1@hotmail.com"
               "whatsapp" : "33888887777"
           }
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Error updating contact
             HTTP/1.1 500 Internal Server Error
           @apiErrorExample {json} Contact not found
             HTTP/1.1 404 Not Found
           @apiUse headerAndErrorsContacts
         */
        .put(app.auth.authenticate(), controller.updateContact)

        /**
         * @api {delete} /contacts/:id Deletes the contact by ID
         * @apiGroup Contacts
         * @apiParam  {String} id Contact ID
         * @apiParamExample  {String} Input:
           {
               "id" : "123QWASDFasd"
           }
         * @apiSuccessExample {json} Success
         *    HTTP/1.1 204 No Content
         * @apiErrorExample {json} Error deleting contact
             HTTP/1.1 500 Internal Server Error
           @apiErrorExample {json} Contact not found
             HTTP/1.1 404 Not Found
           @apiUse headerAndErrorsContacts
         */
        .delete(app.auth.authenticate(), controller.deleteContactById);
};