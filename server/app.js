// src/server.js
const path = require('path');
const Express = require('express');
const config = require('./config');
const api = require('./api');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const env = config.name;

const app = new Express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(Express.static(path.join(__dirname, 'assets')));
app.use(cors());
app.use(bodyParser.json());

// App
app.get('*', (req, res, next) => {
	if (req.accepts('html', '*/*') !== 'html') {
		next();
		return;
	}
	const entry = 'bundle.js';
	const preloadScripts = [entry];

	// Asset preloading
	// These headers may be picked by supported CDNs or other reverse-proxies and push the assets via HTTP/2
	// To disable PUSH, append '; nopush"
	// More details: https://blog.cloudflare.com/announcing-support-for-http-2-server-push-2/
	const linkHeaders = [...preloadScripts.map(script => `\</js/${script}\>; rel=preload; as=script`)];

	// Append Link headers
	res.set('Link', linkHeaders);

	res.render('index', {
		entry,
		env
	});
});

// API

// POST
app.post('/api/matchup/update', api.updateMatchup);
app.post('/api/matchup/addTip', api.addMatchupTip);
app.post('/api/matchup/updateTip', api.updateMatchupTip);
app.post('/api/champ/addTip', api.addChampTip);
app.post('/api/champ/updateTip', api.updateChampTip);
app.post('/api/champ/updateChampMatchup', api.updateChampMatchup);

// GET
app.get('/api/matchup', api.getMatchup);
app.get('/api/matchups', api.getMatchups);
app.get('/api/champs', api.getChampions);
app.get('/api/champ', api.getChampion);


app.listen(port, err => {
	if (err) {
		return console.error(err);
	}

	console.info(`Server running on http://localhost:${port} [${env}]`);
});
