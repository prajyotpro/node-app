const Controller 	= require('../core/controller');
const async 		= require('async');
const authenticator = require('../lib/authenticator');

// Models
const models 		= require('../models');

var User = function() {
	Controller.call(this);
};

User.prototype = Object.create(Controller.prototype);
User.prototype.constructor = User;


User.prototype.createUser = function(req, res) {

	async.waterfall([

	    function(callback) { callback(null, req.body); },

	    models.user.createNew, 

	    authenticator.generateToken, 

	    models.user_token.createNew
	    
	], function (err, result) {
	    
		if (err) {
			return res.status(403).send(err);
		}

		delete result.password;
		return res.status(201).send(result);
	});
};


User.prototype.signIn = function(req, res) {

	async.waterfall([

		function(callback) { callback(null, req.body.email); },

		models.user.getByEmail,

		function(result, callback) { 

			let password = req.body.password;
			req.body = result;
			return callback(null, {password:password, hash:result.password}); 
		},

		authenticator.comparePassword,

		function(result, callback) { callback(null, req.body); },

		authenticator.generateToken, 

		models.user_token.createNew

	], function(err, result) {

		if (err) {
			return res.status(403).send(err);
		}

		delete result.password;
		return res.status(200).send(result);		
	});
};


module.exports = new User();
