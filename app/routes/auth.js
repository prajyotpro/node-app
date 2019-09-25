var User        	= require('../controllers/user');
var express 		= require('express');
var router 			= express.Router();

/**
 * @api {post} /auth/ User signup
 * @apiName User Signup
 * @apiGroup Auth
 *
 * @apiParam {String} email Users unique email.
 * @apiParam {String} first_name Users first name.
 * @apiParam {String} last_name Users last name.
 * @apiParam {String} password Users account password.
 *
 * @apiSuccess {Object} firstname Firstname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.post('/signup', User.createUser);

/**
 * @api {get} /user/:id Request User information
 * @apiName GetUser
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "firstname": "John",
 *       "lastname": "Doe"
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */
router.post('/signin', User.signIn);

module.exports = router;
