# URL Shortner
    A Node app to shortner url and then deploy it on aws lambda

## Steps To deploy/run url shortener app
# create mongo db
use url_shortener;

## download deps
npm install
## start node project, go to project directory
nodejs app.js

# run query on mongoshell for first time after running app
db.counters.insert({ _id: 'url_count', seq: 999999999 })


## reference to setup
1. for node app setup
    https://coligo.io/create-url-shortener-with-node-express-mongo/

2. for aws lambda
    https://www.twilio.com/blog/2017/09/serverless-deploy-nodejs-application-on-faas-without-pain.html

3. Forbidden issue
    https://forums.aws.amazon.com/thread.jspa?threadID=225659

# example
config.db.url=mongodb://UESR:PWD@PRIMARY,SECONDARY/DB_NAME?replicaSet=REPLICASET_URL


# take care about config.js
it's not been commited in code I am just committing reference with name config_example.js


# Important Note
to make build and deploy on aws lambda, Be careful to run these command it will update you app on aws if correct creds given

npm run deploy

