const Controller 	= require('../core/controller')
const async 		= require('async')

// Models
const models 		= require('../models')

var Product = function() {
	Controller.call(this)
} 

Product.prototype = Object.create(Controller.prototype) 
Product.prototype.constructor = Product


Product.prototype.getProducts = function(req, res) {

	models.products.getProducts(req, function(err, products) {
		if(err) {
			return Product.prototype.processErrorReponse(res, err)
		}	

		return Product.prototype.processSuccessReponse(res, products)
	})
} 


Product.prototype.createProduct = function(req, res) {

	models.products.createProduct(req, function(err, product) {
		if(err) {
			return Product.prototype.processErrorReponse(res, err)
		}	

		return Product.prototype.processCreatedReponse(res, product)
	})
}


Product.prototype.updateProduct = function(req, res) {

	models.products.updateProduct(req, function(err, product) {
		if(err) {
			return Product.prototype.processErrorReponse(res, err)
		}	

		return Product.prototype.processSuccessReponse(res, product)
	})
}




module.exports = new Product() 