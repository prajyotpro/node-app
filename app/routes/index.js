const fs 	= require('fs');

module.exports = function(app) {

	app.get("/", function(req, res) {
		return res.send("Welcome to muffin api services.");
	});

	return fs.readdir('./app/routes/', function(err, files) {

		return files.forEach(function(file) {
			if( file.indexOf("index.js") < 0 ) {
				let originalRouterName 	= file.split(".js");
				let routerName 			= originalRouterName[0].split("-");

				if( routerName.length < 2 ) {
					routerName[1] = routerName[0];
				  	routerName[0] = "v1";
				}

				return app.use("/" + routerName[0] + "/" + routerName[1].toString() + "/", require("./" + originalRouterName[0]));
			}
		});
	});
}