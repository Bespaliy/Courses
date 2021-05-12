'use strict';

const http = require('http');
const staticServer = require('./static.js');
const PORT = 8001;

staticServer(8000);

http.createServer(async (req, res) => {
	let reg = '';
	req.on('data', chunk => {
		console.log(chunk.toString());
		reg += chunk;
	});
	req.on('end', () => {
		console.log(reg);
	});
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
	res.setHeader('Access-Control-Allow-Methods', '*');
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.end();
}).listen(PORT);


console.log(`Server on port ${PORT}`);