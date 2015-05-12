var http = require('http');
var qs = require('querystring');
var spawn = require('child_process').spawn;

function readFully(stream, callback) {
    var data = '';
    stream.on('data', function (chunk) { data += chunk; });
    stream.on('end', function () { callback (data); });
}

var server = http.createServer(function (req, res) {
	console.log(new Date() + ' ' + req.method + ' ' + req.url);
	res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
	if (req.method === 'POST') {
	    readFully(req, function (postbody) {
		    console.log(new Date() + ' ' + postbody);
		    var params = qs.parse(postbody);
		    res.write('<html><body>');
		    res.write('<h1>Deploying ' + params.app + ' til ' + params.env + '</h1><a href=".">Back</a><br><br><pre>\n');
		    var child = spawn('./deploy.sh', [params.app, params.env], {cwd: '/home/aurora/deploy'});
		    child.stdout.pipe(res);
		    child.stderr.pipe(res);
		    child.on('exit', function() {
			    res.end('</pre></body></html>');
			});
		});
	} else {
	    res.end('<html><head><style>select,input,body {font-size: 24px} input {border: 1px solid black; border-radius: 5px}</style></head>\
                 <body><h1>Deployserver</h1><form method="POST">\
                   Applikasjon: <select name="app">\
                                  <option>sofus-kjerne</option><option>saksbehandling</option>\
                                  <option>minskatteside</option><option>testgui</option>\
                                </select><br> \
                   Miljø: <select name="env"><option>at</option><option>utv</option><option>likhetstest</option></select><br><br>\
                   <input type="submit" value="Deploy" />\
                 </body></html>');
	}
    });

var port = process.argv.length > 2 ? +process.argv[2] : 9080;
server.listen(port);
console.log(new Date() + ' Startet deployserver på port ' + port);
