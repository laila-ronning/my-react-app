var express = require('express');;
var expressServer = express();
var app = require('./js/app');

expressServer.get('/app');

var port = 9070;
expressServer.listen(port);
console.log(new Date() + ' Startet deployserver på port ' + port);
