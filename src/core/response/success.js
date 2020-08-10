var Response = require('./response-factory');

/** 
 * 
 */
class Success extends Response
{
    constructor() {
        super();
        this.count = 0;
    }

    setCount(count) {
        this.count = isNaN(count) ? this.count : count;
    }

    getCount() {
        this.count = this.count === 0 ? this.data.length : this.count;
        return this.count;
    }

    get() {
        return {
            count: this.count,
            data: this.data
        }
    }
}

module.exports = Success;
