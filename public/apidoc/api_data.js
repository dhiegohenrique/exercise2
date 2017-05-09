define({ "api": [
  {
    "type": "delete",
    "url": "/contacts/:id",
    "title": "Deletes the contact by ID",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"id\" : \"123QWASDFasd\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error deleting contact",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Contact not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Acesso não autorizado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/contacts.js",
    "groupTitle": "Contacts",
    "name": "DeleteContactsId",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/contacts",
    "title": "Displays all contacts of the person",
    "group": "Contacts",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "contacts",
            "description": "<p>Person contacts</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "[\n {\n    \"name\" : \"Contact1\"\n    \"phone\" : \"48999998888\"\n    \"email\" : \"contact1@hotmail.com\"\n    \"whatsapp\" : \"4899999999\"\n },\n {\n    \"name\" : \"Contact2\"\n    \"phone\" : \"3599998888\"\n    \"email\" : \"contact2@hotmail.com\"\n    \"whatsapp\" : \"3599999999\"\n },\n {\n    \"name\" : \"Contact3\"\n    \"phone\" : \"37999998888\"\n    \"email\" : \"contact3@hotmail.com\"\n    \"whatsapp\" : \"3766666666\"\n }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/contacts.js",
    "groupTitle": "Contacts",
    "name": "GetContacts",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Acesso não autorizado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/contacts/:id",
    "title": "Displays the person's contact by ID",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"id\" : \"123QWASDFasd\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "contact",
            "description": "<p>Contact data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n           {\n               \"name\" : \"Contact1\"\n               \"phone\" : \"48999998888\"\n               \"email\" : \"contact1@hotmail.com\"\n               \"whatsapp\" : \"4899999999\"\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Contact not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Acesso não autorizado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/contacts.js",
    "groupTitle": "Contacts",
    "name": "GetContactsId",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/contacts?index=INDEX&size=SIZE",
    "title": "Displays the paged person's contacts",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "INDEX",
            "description": "<p>Page index</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "SIZE",
            "description": "<p>Number of results per page</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example of index:",
          "content": "{\n    index : 0\n}",
          "type": "Number"
        },
        {
          "title": "Example size:",
          "content": "{\n    size : 2\n}",
          "type": "Number"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "contacts",
            "description": "<p>Person's contacts</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "[\n    {\n       \"name\" : \"Contact1\"\n       \"phone\" : \"48999998888\"\n       \"email\" : \"contact1@hotmail.com\"\n       \"whatsapp\" : \"4899999999\"\n    },\n    {\n       \"name\" : \"Contact2\"\n       \"phone\" : \"3599998888\"\n       \"email\" : \"contact2@hotmail.com\"\n       \"whatsapp\" : \"3599999999\"\n    }\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/contacts.js",
    "groupTitle": "Contacts",
    "name": "GetContactsIndexIndexSizeSize",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Acesso não autorizado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/contacts",
    "title": "Sign up for a new contact",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Contact name (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "phone",
            "description": "<p>Contact phone</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Contact email</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "whatsapp",
            "description": "<p>Contact Whatsapp</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"name\" : \"Contact1\"\n    \"phone\" : \"48999998888\"\n    \"email\" : \"contact1@hotmail.com\"\n    \"whatsapp\" : \"48777777777\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "json",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 201 OK\n           {\n               \"_id\" : \"123QWASDFasd\"\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error registering contact:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Acesso não autorizado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/contacts.js",
    "groupTitle": "Contacts",
    "name": "PostContacts",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/contacts/:id",
    "title": "Update the contact by ID",
    "group": "Contacts",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Contact ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"name\" : \"Updated Contact1\"\n    \"phone\" : \"11222223333\"\n    \"email\" : \"updatedContact1@hotmail.com\"\n    \"whatsapp\" : \"33888887777\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error updating contact",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Contact not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Acesso não autorizado",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/contacts.js",
    "groupTitle": "Contacts",
    "name": "PutContactsId",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token da pessoa</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/login",
    "title": "Authenticated Token",
    "group": "Login",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of person</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Person's password</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "   {\n\t   \"email\" : \"myEmail@hotmail.com\"\n\t   \"password\" : \"myPassword\"\n   }",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Token authenticated user</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n\t   {\n\t\t   \"token\" : \"xyz.abc.123.hgf\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Authentication error:",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        },
        {
          "title": "Error logging in:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/login.js",
    "groupTitle": "Login",
    "name": "PostLogin"
  },
  {
    "type": "delete",
    "url": "/people/:id",
    "title": "Deletes the person by the ID and all their contacts",
    "group": "People",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"id\" : \"123QWASDFasd\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucess",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error deleting person",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Person not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Unauthorized access",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/people.js",
    "groupTitle": "People",
    "name": "DeletePeopleId",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/people",
    "title": "Displays all registered people",
    "group": "People",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "people",
            "description": "<p>People registered</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "[\n {\n    \"name\" : \"Person1\"\n    \"email\" : \"person1@hotmail.com\"\n },\n {\n    \"name\" : \"Person2\"\n    \"email\" : \"person2@hotmail.com\"\n },\n {\n    \"name\" : \"Person3\"\n    \"email\" : \"person3@hotmail.com\"\n }\n ]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/people.js",
    "groupTitle": "People",
    "name": "GetPeople"
  },
  {
    "type": "get",
    "url": "/people:/id",
    "title": "Displays the person by ID",
    "group": "People",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"id\" : \"123QWASDFasd\"\n}",
          "type": "String"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "pessoa",
            "description": "<p>Person's data</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 200 OK\n           {\n               \"name\" : \"Person1\"\n               \"email\" : \"person1@hotmail.com\"\n               \"password\" : \"myPassword\"\n           }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/people.js",
    "groupTitle": "People",
    "name": "GetPeopleId",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Person not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Unauthorized access",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/people?index=INDEX&size=SIZE",
    "title": "Displays people registered with pagination",
    "group": "People",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "INDEX",
            "description": "<p>Page index</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "SIZE",
            "description": "<p>Number of results per page</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Example of index:",
          "content": "{\n    index : 0\n}",
          "type": "Number"
        },
        {
          "title": "Example size:",
          "content": "{\n    size : 2\n}",
          "type": "Number"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "json",
            "optional": false,
            "field": "people",
            "description": "<p>People registered</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "[\n{\n    \"name\" : \"Person1\"\n    \"email\" : \"person1@hotmail.com\"\n},\n{\n    \"name\" : \"Person2\"\n    \"email\" : \"person2@hotmail.com\"\n}\n]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/people.js",
    "groupTitle": "People",
    "name": "GetPeopleIndexIndexSizeSize"
  },
  {
    "type": "post",
    "url": "/people",
    "title": "Join a new person",
    "group": "People",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Person's name (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of person (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Person's password (required)</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"name\" : \"Person\"\n    \"email\" : \"emailPerson@hotmail.com\"\n    \"password\" : \"myPassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "json",
            "optional": false,
            "field": "id",
            "description": "<p>Registered person ID</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success:",
          "content": "HTTP/1.1 201 OK\n           {\n               \"_id\" : \"123QWASDFasd\"\n           }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error registering person:",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/people.js",
    "groupTitle": "People",
    "name": "PostPeople"
  },
  {
    "type": "put",
    "url": "/people/:id",
    "title": "Update person by ID",
    "group": "People",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>ID of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Input:",
          "content": "{\n    \"name\" : \"Updated person\"\n    \"email\" : \"updatedPerson@hotmail.com\"\n    \"password\" : \"myUpdatedPerson\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Sucess",
          "content": "HTTP/1.1 204 No Content",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error updating person",
          "content": "HTTP/1.1 500 Internal Server Error",
          "type": "json"
        },
        {
          "title": "Person not found",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        },
        {
          "title": "Unauthorized access",
          "content": "HTTP/1.1 401 Unauthorized",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/people.js",
    "groupTitle": "People",
    "name": "PutPeopleId",
    "header": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token of person</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header:",
          "content": "{\"Authorization\": \"JWT xyz.abc.123.hgf\"}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/",
    "title": "API Status",
    "group": "Status",
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>API status message</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Sucesso:",
          "content": "HTTP/1.1 200 OK\n\t   {\n\t\t   \"status\" : \"API Exercise2\"\n\t   }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "app/routes/index.js",
    "groupTitle": "Status",
    "name": "Get"
  }
] });
