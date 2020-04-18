const httpStatus = require('http-status-codes');

/**
 * 
 */
class Response
{
    constructor() {
        this.httpStatusCode = httpStatus;

        // default success status
        this.statusCode = 200;
        this.data = [];
    }
    
    setStatus(statusCode) {
        this.statusCode = isNaN(statusCode) ? this.statusCode : statusCode;
    }

    setData(data) {
        this.data = data;
    }
}

module.exports = Response;
