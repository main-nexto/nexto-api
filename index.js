'use strict';

var express = require('express');
var path = require('path');
var app = require('connect')();
var http = require('http');
var cors = require('cors');
var swaggerTools = require('swagger-tools');
var jsyaml = require('js-yaml');
var fs = require('fs')
var config = require('./config/config.js').get(process.env.NODE_ENV);
var serverconf = require('./config/serverconf');

// swaggerRouter configuration
var options = {
  swaggerUi: '/swagger.json',
  controllers: './controllers',
  useStubs: process.env.NODE_ENV === 'dev' ? true : false // Conditionally turn on stubs (mock mode)
};

// The Swagger document (require it, build it programmatically, fetch it from a URL, ...)
var spec = fs.readFileSync('./docs/swagger.yaml', 'utf8');
var swaggerDoc = jsyaml.safeLoad(spec);

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
  // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
  app.use(middleware.swaggerMetadata());

	app.use(cors());

  // Validate Swagger requests
  app.use(middleware.swaggerValidator());

  // Route validated requests to appropriate controller
  app.use(middleware.swaggerRouter(options));

  // Serve the Swagger documents and Swagger UI
  app.use(middleware.swaggerUi());

  app.use(express.static(path.join(__dirname, 'public')));

  // Start the server
  const port = config.port;
  var hostname = serverconf.HostAddress();
  http.createServer(app).listen(port, function () {
    console.log(`Server-${process.env.NODE_ENV} is running at http://${hostname}:${port}/`);
    console.log(`Swagger-ui is available on http://${hostname}:${port}/docs`);
  });
});