// src/server.js
const path = require('path');
const Express = require('express');
const config = require('./config');
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 8080;
const env = config.name;

const app = new Express();

const api = {};

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


// GET Questions
api.getQuestions = function (req, res) {
	res.json([
		{
			question: 'Who should we hire for this software engineering position?',
			a: 'Bill Gates',
			b: 'Nick Barth',
			c: 'Linus Torvalds',
			d: 'Alan Turing'
		},
		{
			question: 'What reason is there to not hire Nicholas Barth in any company?',
			a: 'He is far too valuable to the American people to allow his emigration',
			b: 'He is way over qualified for nearly all positions',
			c: 'His charitable and volunteering contributions will go down',
			d: 'He already has too much money'
		},
		{
			question: 'What will happen to children of Nick Barth?',
			a: 'They will have a very rich & handsome father',
			b: 'They will have a very intelligent & beautiful mother',
			c: 'They will have long and healthy lives',
			d: 'All of the above'
		},
		{
			question: 'How many bears would Bear Grylls grill if Bear Grylls could grill bears?',
			a: '5',
			b: '10',
			c: '40',
			d: 'Nick Barth'
		}
	]);

};

api.grade = function (req, res) {
	const test = req.query.test;
	const key = ['b', 'c', 'd', 'd'];
	const result = [];

	test.forEach((q, i) => test[i] === key[i] ? result.push(true) : result.push(false));

	res.json(result);


};

// GET
app.get('/api/questions', api.getQuestions);

// POST
app.post('/api/grade', api.grade);

app.listen(port, err => {
	if (err) {
		return console.error(err);
	}

	console.info(`Server running on http://localhost:${port} [${env}]`);
});
