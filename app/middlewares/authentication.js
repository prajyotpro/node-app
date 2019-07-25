
/*
function to get user details from user_id
@param req Object
@param res Object
@param next callback function
*/
var Users, allowed_routes, auth, config, getUserDetailsFromUserId, jwt, response, to_authenticate;

jwt = require('jwt-simple');

config = require('../config');

auth = require('../core/authentication');

response = require('../lib/response-handler');

Users = require('../models/users-model');

to_authenticate = ['users', 'roles', 'audit_trails', 'layers', 'locations', 'states', 'form_templates', 'collections', 'organisations', 'queries', 'selections', 'layerfiles'];

allowed_routes = ['users', 'layers', 'locations', 'states', 'form_widgets', 'form_templates', 'collections', 'selections', 'layerfiles'];

module.exports = function(req, res, next) {
  var decoded_token, e, path, token, user_id;
  path = req.path.split('/')[2];
  if (to_authenticate.indexOf(path) >= 0) {
    // authenticate user
    token = auth.getToken(req.headers);
    if (!token) {
      return response.unauthorized(res);
    }
    try {
      decoded_token = jwt.decode(token, config.server.salt);
    } catch (error1) {
      e = error1;
      return response.unauthorized(res);
    }
    user_id = auth.getUserIdFromDecodedToken(decoded_token);
    req.user_id = user_id;
    return getUserDetailsFromUserId(req, res, next);
  } else {
    return next();
  }
};

getUserDetailsFromUserId = function(req, res, next) {
  return Users.findOne({
    _id: req.user_id
  }, ['status'], function(err, valid) {
    if (err) {
      return response.unauthorized(res);
    }
    if (!valid) {
      return response.unauthorized(res);
    }
    if (valid.status === false) {
      return response.unauthorized(res);
    } else {
      return Users.getUserDetails(req, function(error, result) {
        var path, ref, ref1, ref2, ref3;
        if (error) {
          return response.unauthorized(res);
        }
        if (!result || result === null || result.length === 0) {
          return response.unauthorized(res);
        }
        req.headers.user_role = result[0].user_role;
        req.headers.user_login_details = result[0];
        path = req.path;
        switch (req.headers.user_role) {
          case 1: // group admin
            console.log("Admin");
            break;
          case 2: // group admin
            if (path.includes("collections")) {
              if ((ref = req.method.toLowerCase()) === 'post' || ref === 'delete') {
                return response.unauthorized(res);
              }
            }
            break;
          case 3: // user
            if (path.includes("users")) {
              if ((ref1 = req.method.toLowerCase()) === 'post' || ref1 === 'delete') {
                return response.unauthorized(res);
              }
            }
            if (path.includes("form_templates")) {
              return response.unauthorized(res);
            }
            if (path.includes("collections")) {
              return response.unauthorized(res);
            }
            break;
          case 4: // guest
            if (path.includes("users")) {
              if ((ref2 = req.method.toLowerCase()) === 'post' || ref2 === 'delete') {
                return response.unauthorized(res);
              }
            }
            if (path.includes("form_templates")) {
              return response.unauthorized(res);
            }
            if (path.includes("collections")) {
              return response.unauthorized(res);
            }
            break;
          case 5: // surveyor
            if (path.includes("users")) {
              return response.unauthorized(res);
            }
            if (path.includes("form_templates")) {
              if ((ref3 = req.method.toLowerCase()) === 'post' || ref3 === 'put' || ref3 === 'delete' || ref3 === 'patch') {
                return response.unauthorized(res);
              }
            }
            if (path.includes("collections")) {
              if (req.method.toLowerCase() === 'patch') {
                return response.unauthorized(res);
              }
            }
            break;
          default:
            return response.unauthorized(res);
        }
        return next();
      });
    }
  });
};
