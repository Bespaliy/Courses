'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const render = require('./api/render');


http.createServer(async (req, res) => {
	const url = req.url;
	let reg = '';
	try {
		const page = await render(url);
		res.writeHeader(200, {'Content-Type' :'text/html'});
		res.end(page);
	} catch(e) {
		res.statusMessage = 404;
        res.end('<h1>File not found</h1>');
	}

	req.on('data', chunk => {
		reg += chunk;
		console.log(reg);
	});
}).listen(8000);