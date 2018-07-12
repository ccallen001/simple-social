const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const io = require('socket.io');
const request = require('request');

const server = express();
server.port = process.env.PORT || 1234;

server.use(bodyParser.json());
server.use(express.static('./'));

server.get('/', (req, res) => {
	// reads from root
	fs.readFile('server/index.html', (err, file) => {
		if (err) {
			console.error('(!) There was an error reading the index.html file.', err);
			res.send();
		} else {
			res.send(file.toString());
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

server.get('/messages', (req, res) => {
	request({
		method: 'GET',
		url: 'https://simplesocial-9657.restdb.io/rest/messages',
		headers:
		{
			'cache-control': 'no-cache',
			'x-apikey': 'e4ed141eafa38247e1b1750dcbb12b6e647bd'
		}
	}, function (err, response, body) {
		if (err) {
			res.send(err);
		} else {
			res.send(body);
		}
	});
});

server.post('/messages', (req, res) => {
	request({
		method: 'POST',
		url: 'https://simplesocial-9657.restdb.io/rest/messages',
		headers:
		{
			'cache-control': 'no-cache',
			'x-apikey': 'e4ed141eafa38247e1b1750dcbb12b6e647bd',
			'content-type': 'application/json'
		},
		body: req.body,
		json: true
	}, (err, response, body) => {
		if (err) {
			res.send(err);
		} else {
			res.status(200).send(response.toString());
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

server.listen(server.port, () => console.log(`> server.js now listening on port ${server.port}...`));