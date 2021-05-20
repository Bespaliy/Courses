'use strict';

const http = require('http');
const staticServer = require('./static.js');
const User = require('./Models/User.js');
const PORT = 8001;

staticServer(8000);

const receiveArgs = async (req) => { 
  	const buffers = [];
  	for await (const chunk of req) buffers.push(chunk);
  	const data = Buffer.concat(buffers).toString();
  	if (!data) return;
  	return JSON.parse(data);
};


http.createServer(async (req, res) => {
	const url = req.url;
	try {
		const args = await receiveArgs(req);
		if (args) {
			const user = new User(...Object.values(args));
			await User.save(user);
		} 
	} catch(e) {
		console.log(e);
	}
	res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
	res.end();	
}).listen(PORT, console.log(`Server on port ${PORT}`));
