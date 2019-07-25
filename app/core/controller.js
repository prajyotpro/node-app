var Controller = function() {

} 


Controller.prototype.authenticate = function() {
  return "authenticate" 
} 

Controller.prototype.processSuccessReponse = function(res, data) {

	let response = {
		status	: true,
		count 	: data.count ? data.count : 0,
		data	: data.data,
		error 	: []
	}
	return res.status(200).json(response) 
}

Controller.prototype.processCreatedReponse = function(res, data) {

	let response = {
		status	: true,
		count 	: 1,
		data	: data,
		error 	: []
	}
	return res.status(201).json(response)
}

Controller.prototype.processErrorReponse = function(res, err) {

	let response = {
		status	: false,
		count 	: 0,
		data	: [],
		error 	: [err]
	}
	return res.status(409).json(response)
}

module.exports = Controller 