/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /things              ->  index
 * POST    /things              ->  create
 * GET     /things/:id          ->  show
 * PUT     /things/:id          ->  update
 * DELETE  /things/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var services = require('../../services');
var campaignsDal = require('../../dal/campaignsDal');
var clicksDal = require('../../dal/clicksDal');
var cookie = require('cookie');
var url = require('url');


var parseCookies = function(request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = unescape(parts.join('='));
    });

    return list;
  }

//track campaign click
exports.trackClient = function(req, res) {

  var cookies = parseCookies(req);

  if (!cookies || !cookies.cookieId) {
    return handleError('cookie "cookieId" not found.');
  }

  clicksDal.getClickByCookieId(cookies.cookieId, function(click) {
    if (!click) {
      return handleError('origin click not found.');
    }

    if (!click.conversion) {
      click.conversion = 1;
      click.conversionDateTime = new Date();

      clicksDal.updateClick(click, function() {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.end();

        return;
      })
    }

    return handleError(res, 'already converted.');
    
  });
};

exports.trackServer = function(req, res) {
  console.log('trackServerrrrrrrrrrrrrrrrrrrrrrrrr');
  console.log(req.params.id);

if (!req.params.id) {
    return handleError('clientId not found.');
  }

  clicksDal.getClickByCookieId(req.params.id, function(click) {
    if (!click) {
      return handleError('origin click not found.');
    }

    if (!click.conversion) {
      click.conversion = 1;
      click.conversionDateTime = new Date();

      clicksDal.updateClick(click, function() {
        res.send(200);

        return;
      })
    }

    return handleError(res, 'already converted.');
    
  });
};

function handleError(res, err) {
  res.writeHead(500, {'Content-Type': 'image/jpeg'});
  res.end();

  return;
}