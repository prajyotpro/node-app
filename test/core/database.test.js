const chai = require('chai');
const assert = chai.assert;
const expect = chai.expect;

const db = require('../../src/core/database');

describe('Database', function() {
    describe('#validate database configuration', function() {
        
        const database = db.getDatabase();
        if(typeof database === 'boolean') {
            it('should return false if no database it set', function() {
                assert.equal(false, database);
            })
        }
    
    });
});