require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/ping', function(req, res) {
  res.json({ greeting: 'pong' });
});

app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/shorturl', (req, res) => {
	const url = req.body.url;

	dns.lookup(url, (err, addresses) => {
		if (addresses !== undefined) {
			console.log(`New addr: ${addresses}`);
			URLs.push(addresses);
		}
	});

	console.dir(`Current array: ${URLs}`);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});

let URLs = [];