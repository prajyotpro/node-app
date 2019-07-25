const authenticator = require('../app/lib/authenticator')


describe('Authentication', function() { 

	describe('#generatePassword()', function() {
		it('should generate password without error', function(done) { 

			authenticator.generatePassword("password", function(error, result) {
				if(error) {
					done(error)
				} else {
					done()
				}
			})

			/*var user = new User('Luna')
			user.save(function(err) {
				if (err) done(err)
				else done()
			})*/
		})
	})


})