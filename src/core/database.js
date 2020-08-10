const config = require('config');

function validateSqlDatabaseConnectionConfig() {

}

function validateMongoDbConnectionConfig() {

}

function validateMondoDbConnectionStringConfig() {

}

function getDatabase() {

    if(config.app.database 
        && config.app.database.dialect.toString().trim() === '') {
        return false;
    }

    let databaseDialect = false;
    switch(config.app.database.dialect.toString().trim()) {
        case 'mysql': 
            databaseDialect = validateSqlDatabaseConnectionConfig();
            break;
    }
}

module.exports = {
    getDatabase
}