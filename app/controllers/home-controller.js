const Controller = require("../core/Controller");

class HomeController extends Controller
{
    static index(req, res) {
        res.send("Hello World!");
    }
}

module.exports = HomeController;