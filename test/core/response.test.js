const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const Success = require('../../app/core/response/success');
const Error = require('../../app/core/response/error');

describe('Success', function() {
    describe('#statusCode(200)', function() {
        it('should return 200 when status code is not set', function() {
            let response = new Success();
            assert.equal(200, response.statusCode);
        });
    });

    describe('#statusCode(201)', function() {
        it('should return 201 when status code is set to 201', function() {
            let response = new Success();
            response.setStatus(response.httpStatusCode.CREATED);
            assert.equal(201, response.statusCode);
        });
    });

    describe('#responseData([])', function() {
        it('should return empty object if no data is specified.', function() {
            let response = new Success();
            expect([]).to.eql(response.data);
        });
    });

    describe('#responseData(count)', function() {
        it('should return count with 0 id not data is set.', function() {
            let response = new Success();
            expect(0).to.eql(response.count);
        });
    });

    describe('#responseData(count)', function() {
        it('should return count with length of data.', function() {
            let response = new Success();
            response.setData([1,2,3,4]);
            assert.equal(4, response.getCount());
        });
    });

    describe('#responseData(count)', function() {
        it('should return count which is set as per developer.', function() {
            let response = new Success();
            response.setCount(4);
            assert.equal(4, response.getCount());
        });
    });

    describe('#statusCode(404)', function() {
        it('should return 404 when status code is set to 404', function() {
            let error = new Error();
            error.setStatus(error.httpStatusCode.NOT_FOUND);
            assert.equal(404, error.statusCode);
        });
    });
});