/**
 * Function to welcome home -- muffin app
 * @param {object} req express request
 * @param {object} res express response
 */
function home(req, res) {
  res.status(200).json({message: 'Welcome to Muffin App'});
}

module.exports = {
  home,
};
