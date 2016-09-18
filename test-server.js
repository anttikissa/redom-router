var http = require('http');
var fs = require('fs');

var log = console.log;

function serve(res, file) {
	var type = 'text/html';
	if (file.endsWith('.js')) {
		type = 'application/javascript';
	}
	res.writeHead(200, {
		'Content-Type': type
	});

	res.end(fs.readFileSync(__dirname + file));
}

var server = http.createServer((req, res) => {
	log(req.url);

	if (req.url === '/favicon.ico') {
		res.statusCode = 404;
		return res.end();
	}

	if (req.url.endsWith('.js')) {
		return serve(res, req.url);
	}

	serve(res, '/test-app.html');
});

server.listen(9000, () => {
	console.log('Listening at http://localhost:9000/');
});
