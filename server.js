const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const io = require('socket.io');

const server = express();
server.port = 1234;

server.use(bodyParser.json());
server.use(express.static('./'));

server.get('/', (req, res) => {
	fs.readFile('./index.html', (err, file) => {
		if (err) {
			console.error('(!) There was an error reading the index.html file.');
		} else {
			res.send(file.toString());
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

server.get('/messages', (req, res) => {
	fs.readFile('./data/messages.json', (err, data) => {
		if (err) {
			console.error('(!) There was an error reading the messages.json file.');
		} else {
			res.send(data.toString());
		}
	});
});

server.post('/messages', (req, res) => {
	fs.readFile('./data/messages.json', (err, data) => {
		if (err) {
			console.error('(!) There was an error reading the messages.json file.');
		} else {
			const messages = JSON.parse(data.toString());
			messages.push(req.body);

			fs.writeFile('./data/messages.json', JSON.stringify(messages), err => {
				if (err) {
					console.error('(!) There was an error writing the messages.json file.');
				} else {
					res
						.status(200)
						.send();
				}
			});
		}
	});
});

////////////////////////////////////////////////////////////////////////////////

server.listen(server.port, () => console.log(`> server.js now listening on port ${server.port}...`));