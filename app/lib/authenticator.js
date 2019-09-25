const models		= require('../models')
const jwt         	= require('jwt-simple')
const jsonwebtoken	= require('jsonwebtoken')
const bcrypt 		= require('bcrypt')

const config    	= require('config')
const securityConfig = config.get('app.security')


class Authenticator { 

	constructor() {}

	/*
	Function to generate password 
	@param passwordtext - password text
	@param callback - callback function(error, result)
	*/
	generatePassword(passwordText, callback) {

		if(typeof passwordText != 'string') {
			return callback("Password text must be a string.")
		}

		bcrypt.hash(passwordText.trim(), securityConfig.salt_rounds, function(err, hash) {
	  	
		  	if (err) {
		  		console.log(err);
		  		return callback("Error generating password.", false)
		  	}

		  	return callback(false, hash)
		})
	}


	/*
	Function to validate password 
	@param passwordtext - password text
	@param passwordhash - password hash
	@param callback - callback function(error, result)
	*/
	verifyPassword(passwordText, passwordHash, callback) {

		if(typeof passwordText != 'string') {
			return callback("Password text must be a string.")
		}

		if(typeof passwordHash != 'string') {
			return callback("Password hash must be a string.")
		}

		bcrypt.compare(passwordText.trim(), passwordHash.trim(), callback)
	}


	/*
	Function to generate JWT token
	@param payload - payload object
	@param callback - callback function(error, result)
	*/
	generateToken(payload, callback) {

		if(typeof payload != 'object') {
			return callback('Invalid payload, must be object.')
		}


	}

}

module.exports = new Authenticator()


/*
const Authenticator = function() {};


Authenticator.prototype.authenticate = function(req, res, next) {

	var token = getToken(headers);

	if (!token) {
		return res.status(config.CODES.UNAUTHORIZED).send("Unauthorized");
	}

	try {
	    var decodedToken = jwt.decode(token, config.SECURITY.SALT);
	}
	catch(err) {
	    return res.status(config.CODES.UNAUTHORIZED).send("Unauthorized");
	}

	var userId = getUserIdFromDecodedToken(decodedToken);

	models.token.findAll({where: {
		user_id	: userId,
		token 	: token
	}}).then(function(user) {
		if (user.length == 0) {
			return res.status(config.CODES.UNAUTHORIZED).send("Unauthorized");
		}

		req.user_info = user[0].user_id;
		return next();
	});
};



Authenticator.prototype.generateToken = function(userInfo, callback) {

	if (typeof userInfo != 'object') {
		return callback('Invalid user data.');
	}

	if (userInfo.id == undefined) {
		return callback('Invalid user data.');
	}

	// ** Generating current date to randomise token
    let now = new Date();
    let generatedToken = jwt.encode(userInfo.id + '_' + now, config.SECURITY.SALT);

    userInfo.token = generatedToken;

    return callback(false, userInfo);
};


module.exports = new Authenticator();


// ========================================== FUNCTIONS ==========================================
var getToken = function (headers) {

	if (headers && headers.authorization) {
		var parted = headers.authorization.split(' ');
	
		if (parted.length != 2) {
			return null;
		}

		if (parted[0] != 'Bearer') {
			return null;
		}
	  	
	  	return parted[1];
		
	} else {
		return null;
	}
};

var getUserIdFromDecodedToken = function (decodedToken) {

	var parted = decodedToken.split('_');
	return parted[0];
}

*/