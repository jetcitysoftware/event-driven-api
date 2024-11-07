'use strict';

const server = require('./src/http.js');

module.exports = {
  registerRoute: server.router.register,
  start: (port, callback) => server.listen(port, callback),
  stop: (callback) => server.close(callback),
};
