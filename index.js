'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const route = {
	'/' : () => new Promise((resolve, reject) => fs.readFile(path.join(__dirname ,'static', 'index.html'), (err, data) => {
		if (err) reject(err);
		else resolve(data);
	})),

	'/add' : () => new Promise((resolve, reject) => fs.readFile(path.join(__dirname ,'static', 'add.html'), (err, data) => {
		if (err) reject(err);
		else resolve(data);
	}))
}

http.createServer(async (req, res) => {
	const url = req.url;
	console.log(url);
	try {
		const data = await route[url]();
		res.writeHeader(200, {'Content-Type' :'text/html'});
		res.end(data);
	} catch(e) {
		res.statusMessage = 404;
        res.end('<h1>File not found</h1>');
	}
}).listen(8000);