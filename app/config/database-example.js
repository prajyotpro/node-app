module.exports = { 

    "default": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host"    : "127.0.0.1",
        "dialect" : "mysql",
        "logging": false
    },

    "local": {
        "username": "prajyot",
        "password": "password",
        "database": "gym",
        "host"    : "localhost",
        "dialect" : "mysql",
        "logging" : false
    }, 

    "development": {
        "username": "root",
        "password": "root",
        "database": "node_custom",
        "host"    : "localhost",
        "dialect" : "mysql",
        "logging" : false
    }, 

    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host"    : "127.0.0.1",
        "dialect" : "mysql",
        "logging": false
    }, 
    
    "production": {
        "username": "root",
        "password": null,
        "database": "database_production",
        "host"    : "127.0.0.1",
        "dialect" : "mysql",
        "logging": false
    }
}
