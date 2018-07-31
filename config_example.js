var config = {};

//basic auth
config.auth = {};
config.auth.user = '';
config.auth.pwd = '';

// the URL shortening host - shortened URLs will be this + base58 ID
config.webhost = 'http://localhost/';
config.defaultPage = 'https://www.google.com/'

// your MongoDB host and database name
config.db = {};
config.db.url = 'mongodb://USER:PWD@PRIMARY,SECONDARY/DB_NAME?replicaSet=REPLICASET';

// uncomment these in actual config
//module.exports = config;
