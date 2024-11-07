'use strict';

const Route = require('route-parser');

const routes = [];

module.exports = {
  add: (route) => routes.push(new Route(route)),
  parse: (url) => {
    url = url.toLowerCase();
    const route = routes.find(route => route.match(url));
    const params = route.match(url);
    return { route: route.spec, params: params };
  }
}