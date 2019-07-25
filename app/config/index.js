const server_config 	= require('./server')
const database_config 	= require('./database')


var Config = (function() {

	class Config {
		constructor() {}
	}

	var environment 	= typeof process.env.NODE_ENV == 'undefined' ? 'default' : process.env.NODE_ENV
	

	// SERVER CONFIGURATIONS
	Config.server 		= {
	    port 				: server_config[environment].port,
	    salt				: server_config[environment].salt,
	    salt_rounds 		: server_config[environment].salt_rounds,
	    env 				: environment,
	    private_key_path 	: server_config[environment].private_key_path,
	    certificate_path 	: server_config[environment].certificate_path,
	    ca_certificate_path	: server_config[environment].ca_certificate_path
	}

	// DATABASE CONFIGURATIONS
	Config.database = {
		host 				: database_config[environment].host,
		port 				: database_config[environment].port,
		database 			: database_config[environment].database,
		username 			: database_config[environment].username,
		password 			: database_config[environment].password,
		dialect 			: database_config[environment].dialect,
		logging 			: database_config[environment].logging
	}

	return Config	

}).call(this)


module.exports 	= Config