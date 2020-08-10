const Success = require("../../response/success");
const Error = require("../../response/error");

let muffinAppResponse = function (req, res, next) {

    let error = new Error();
    let success = new Success();
    // res._send = res.send;

    res.setError = function(data) {
        error.setData(data);
        res.error = error;
    }

    res.setData = function(data) {
        success.setData(data);
        res.success = success;
        return res;
    }

    res.respond = function() {
        if(res.statusCode > 399) {
            res.send(error.get());
        } else {
            res.send(success.get());
        }
    }

    next()
};


// const express = require('express');
// var app = express();

// app.use(function (req, res, next) {

//     let error = new Error();
//     let success = new Success();
//     // res._send = res.send;

//     res.setError = function(data) {
//         error.setData(data);
//         res.error = error;
//     }

//     res.setData = function(data) {
//         success.setData(data);
//         res.success = success;
//         return res;
//     }

//     res.respond = function() {
//         if(res.statusCode > 399) {
//             res.send(error.get());
//         } else {
//             res.send(success.get());
//         }
//     }

//     next()
// })

module.exports = muffinAppResponse;