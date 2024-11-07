'use strict';

const hash = require('object-hash');
const requests = require('./events');
const routes = require('./routes.js');

const router = module.exports = {};

router.register = (route) => {

  route.methods.forEach(method => {

    const path = route.path.toLowerCase();

    // Store the route in the routing db for later parsing
    routes.add(path);

    // Create a unique "event" name for each route by hashing the method and route
    const routeHash = hash([method, path]);

    console.log(`Registered ${method} ${path} [${routeHash}]`)

    // Register the event listener
    requests.on(routeHash, (reqres) => route.handler(...reqres));

  });

}

