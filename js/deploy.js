var http = require('http');
var qs = require('querystring');
var spawn = require('child_process').spawn;
var childProcess = require('child_process'), ls;


function readFully(stream, callback) {
    var data = '';
    stream.on('data', function (chunk) { data += chunk; });
    stream.on('end', function () { callback (data); });
}

function deploy(deployId) {
    console.log("deploy.deploy(deployId) is called: deployId=", deployId);
    ls = childProcess.exec('ls -l', function (error, stdout, stderr) {
        if (error) {
            console.log(error.stack);
            console.log('Error code: '+error.code);
            console.log('Signal received: '+error.signal);
        }
        console.log('Child Process STDOUT: '+stdout);
        console.log('Child Process STDERR: '+stderr);
    });

    ls.on('exit', function (code) {
        console.log('Child process exited with exit code '+code);
    });
}

function deploy_sofus() {
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
	}
}

module.exports = {
    deploy: deploy
};
