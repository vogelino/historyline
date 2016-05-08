import express from 'express';
import http from 'http';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';

const renderFullPage = (html, title, meta, link, state) => {
	return `
	<!DOCTYPE html>
	<html>
		<head>
			${title}
			${meta}
			${link}
			<link rel="stylesheet" type="text/css" href="/bundle.css">
		</head>
		<body>
			<div id="root">${html}</div>
			<script src="/bundle.js"></script>
		</body>
	</html>
	`;
};

const handleRender = (req, res, props) => {
	const html = renderToString(
		<main>
			<RouterContext {...props} />
		</main>
	);
	const { title, meta, link } = Helmet.rewind();
	res.send(renderFullPage(html, title, meta, link, state));
};

const app = express();

app.use(express.static('public/'));

app.use((req, res) => {
	match({ routes, location: req.url }, (err, redirectLocation, props) => {
		if (err) {
			res.status(500).send(err.message);
		} else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (props) {
			handleRender(req, res, props);
		} else {
			res.sendStatus(404);
		}
	});
});

const server = http.createServer(app);

var port = 3333;
server.listen(port);
server.on('listening', () => {
	console.log(`Listening on ${port}`);
});
