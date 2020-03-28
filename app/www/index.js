var cluster     = require('cluster') // Only required if you want the worker id
var sticky      = require('sticky-session')
const config    = require('config')
const serverConfig = config.get('server');


var http        = require('http')
var app         = module.exports = require('express')()
const express   = require('express')


var server      = require('http').createServer(app)
var io          = require('socket.io')(server)


var port        = process.env.PORT || serverConfig.port


var bodyParser  = require('body-parser')
var helmet      = require('helmet')
var path        = require('path')
var multer      = require('multer')
var multipart   = require('connect-multiparty')

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../../doc/swagger.json')


if (!sticky.listen(server, port)) {

    // Master code
    server.once('listening', function () {

        console.log("Listening to port " + port + "..")
    })

} else {

    console.log("Worker %d is up and running..", cluster.worker.id)

    // Express server setup
    app.use(helmet())
    app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
        extended: true
    }))
    app.use(bodyParser.json())       // to support JSON-encoded bodies
    app.use(multipart({
        uploadDir: config.tmp
    }))


    // ========================================== ROUTES ==========================================
    var router     = require('../routes/')(app)

    // ========================================== PUBLIC ==========================================
    app.use('/apidoc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
    

    // ========================================== SOCKET ==========================================
    var chat = io
        .of('/chat')
        .on('connection', function (socket) {
            console.log('Socket connected.')
            chat.emit('connected', { success: true })
        })

    // const used = process.memoryUsage()
    // for (let key in used) {
    //     console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`)
    // }
}
