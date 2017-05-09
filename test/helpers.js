var supertest = require("supertest");
var chai = require("chai");
var app = require("../app/config/express")();
var config = require("../app/config/config")();
var chaiString = require("chai-string");
require("../app/config/database")(config.db);

global.app = app;
global.request = supertest(app);
chai.use(chaiString);
global.expect = chai.expect;