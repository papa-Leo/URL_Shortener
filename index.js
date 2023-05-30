require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dns = require('dns');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;
let URLs = [];

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/ping', function(req, res) {
  res.json({ greeting: 'pong' });
});

app.get('/api/shorturl/:short_url?', (req, res) => {
	let redirect = URLs[parseInt(req.params.short_url)];
	console.dir(redirect);

	res.redirect(redirect);
});

app.use(bodyParser.urlencoded({extended: false}));
app.post('/api/shorturl', (req, res) => {
	const url = req.body.url;

	if (url.match(/http[s]?:\/\/[.]*/)) {
		console.log('Valid format');
		dns.lookup(url.replace(/.*:\/\//, ""), (err, address) => {
			console.log(`'${url}' resolves to ${address}`);
			if (!err && address !== undefined) {
				console.log('Valid URL');
				URLs.push(url);
				res.json({
					original_url: url,
					short_url: URLs.indexOf(url)
				});
			}/* else {
				invalidURL();
			}*/
		});
	}
	if (!res.headersSent) res.json({error:'invalid url'});
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
