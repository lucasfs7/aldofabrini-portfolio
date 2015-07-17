var express = require('express');
var compression = require('compression');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var app = express();
var port = process.env.PORT || 8080;

var static_files_path = __dirname + '/www';

app.use(bodyParser.urlencoded({extended:false}));
app.use(morgan('combined'));

if (process.env.NODE_ENV === 'production') {
  app.use(compression());
}

app.use(function (req, res, next) {
  if (path.extname(req.path).length > 0) {
    next();
  } else {
    req.url = '/index.html';
    next();
  }
});

app.use(express.static(static_files_path));
app.listen(port, function() {
  console.log("Listening on " + port);
});
