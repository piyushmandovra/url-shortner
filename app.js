var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var basicAuth = require('basic-auth');

var config = require('./config');
var base58 = require('./base58.js');
var Url = require('./models/db.js');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//basic auth function
var auth = function (req, res, next) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
  if (user.name === config.auth.user && user.pass === config.auth.pwd) {
    next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    res.sendStatus(401);
    return;
  }
}


//db connection
var options = { promiseLibrary: require('bluebird'), useMongoClient: true };
mongoose.connect(config.db.url, options);

//json parse
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app listner
module.exports = app;

//routes
//home page
app.get('/', auth, function(req, res){
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// shorten api
app.post('/api/shorten', auth, function(req, res){
  var longUrl = req.body.url;
  var shortUrl = '';
  var slug = '';
  var id;
  // check if url already exists in database
  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      // the document exists, so we return it without creating a new entry
      id = doc._id;
      slug = base58.encode(id);
      shortUrl = config.webhost + slug.toString();
      res.send({'shortUrl': shortUrl});
    } else {
      // since it doesn't exist, let's go ahead and create it:
      var newUrl = Url({ long_url: longUrl });
      newUrl.save(function(err) { if (err){ console.log(err); }
      id =  newUrl._id;
      slug = base58.encode(id);
      shortUrl = config.webhost + slug.toString();
      // updating slug to newly created doc
      Url.update({_id: id},{$set: {slug :slug}}, function (err, doc) {if (err){ console.log(err);}});
      res.send({'shortUrl': shortUrl});
      });
    }});
});

// shorten url routing
app.get('/:encoded_id', function(req, res){
  var id = base58.decode(req.params.encoded_id);
  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(301, doc.long_url);
    } else {
      res.redirect(301, config.defaultPage);
    }});
});

