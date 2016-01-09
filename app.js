'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Knex = require('knex');
const knexConfig = require('./knexfile');
const Model = require('objection').Model;
const fs = require('fs');

const app = express()
  .use(bodyParser.json())
  .use(morgan('dev'))
  .set('json spaces', 2);

const knex = Knex(knexConfig.development);
Model.knex(knex);

const routeFiles = fs.readdirSync(__dirname + '/routes');
routeFiles.forEach((file) => {
  let routeFile = require('./routes/' + file);
  routeFile(app);
});

const server = app.listen(3000, function() {
  console.log("Server running! port: %s!", server.address().port);
});
