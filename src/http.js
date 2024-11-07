'use strict';

const http = require('http');
const hash = require('object-hash');

const requests = require('./events');
const parser = require('./parser');
const router = require('./router');

const requestHandler = async (req, res) => {

  await parser(req);

  // Identify a unique "event" name for each route by hashing the method and route
  const requestHash = hash([req.context.method, req.context.route]);
  // console.log(`Trying ${req.context.route} as ${requestHash}`)

  // If we have a listener
  // emitter.listenerCount(eventName)
  requests.emit(requestHash, [req.context, res])

  // Otherwise, default to a 404

  // How do we handle errors?

  // Maybe a logger of some sort?
  // console.log('PATH', req.path);
  // console.log('QS', req.queryString);
  // console.log('METHOD', req.method);
  // console.log('QUERY', req.query);
  // console.log('BODY', req.body);


};

const app = http.createServer(requestHandler);
app.router = router;

module.exports = app;
