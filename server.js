'use strict';

const server = require('./index.js');

// Route Definition
const home = {
  path: '/',
  methods: ['get'],
  handler: homePage
  // cached: boolean
  // auth: boolean
  // capability: string
  // middleware: [fn, fn, fn] (How do we do this cross language?)
}

server.registerRoute(home);

const apiGetAll = {
  path: '/api/v1/:model',
  methods: ['get'],
  handler: api
}

const apiGetOne = {
  path: '/api/v1/:model/:id',
  methods: ['get'],
  handler: api
}

const apiAddOne = {
  path: '/api/v1/:model',
  methods: ['post'],
  handler: api
}

server.registerRoute(apiGetAll);
server.registerRoute(apiGetOne);
server.registerRoute(apiAddOne);


function homePage(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.write('Hello World');
  res.end();
}

function api(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(req));
  res.end();
}

const PORT = process.env.PORT || 3000;

server.start(PORT, () => console.log(`Server up on ${PORT}`))
