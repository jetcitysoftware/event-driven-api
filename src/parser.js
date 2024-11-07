'use strict';

const urlParser = require('url');
const queryStringParser = require('querystring');
const base64 = require('base-64')
const routes = require('./routes');

module.exports = (req) => {

  return new Promise((resolve, reject) => {

    req.context = {};

    if (!(req || req.url)) { reject('Invalid Request Object. Cannot Parse'); }

    const createRequestBody = () => {
      req.context.body = createBodyObject(req.context.text);
      resolve();
    }

    const url = urlParser.parse(req.url);

    // parse the route for route params, like /user/:id
    const parsedRoute = routes.parse(url.pathname);

    req.context = {
      // Parse basic and bearer
      auth: getAuthorizationData(req.headers.authorization),
      body: {},
      cookies: parseCookies(),
      headers: req.headers,
      method: req.method.toLowerCase(),
      normalizedPath: url.pathname.toLowerCase(),
      path: url.pathname,
      params: parsedRoute.params,
      queryString: url.query,
      query: url.query ? queryStringParser.parse(url.query) : {},
      route: parsedRoute.route,
      text: ''
    }

    if (req.method.match(/post|put|patch/i)) {
      req.on('err', reject);
      req.on('data', (buffer) => req.context.text += buffer.toString());
      req.on('end', createRequestBody);
    }
    else {
      resolve();
    }

  });

};

function parseCookies() {
  return {};
}

function getAuthorizationData(auth) {
  let token, username, password;
  if (auth) {
    let [type, value] = auth.split(' ');
    type = type.toLowerCase();
    switch (type) {
      case "basic":
        [username, password] = base64.decode(value).split(':');
        break;
      case "bearer":
        token = value;
        break;
      default:
        break;
    }
    return { token, username, password };
  }
}

function json(str) {
  try { return JSON.parse(str); }
  catch (e) { return false; }
}

function createBodyObject(text) {
  return text && (json(text) || queryStringParser.parse(text) || {}) || {};
}
