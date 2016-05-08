var browserify = require('browserify');
var babelify = require('babelify').configure(babelConfig);
var path = require('path');
var fs = require('fs');
var babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc')));

var server = browserify({
	entries: [ path.join(__dirname, '../src/server.js') ],
	transform: babelify
});

server.bundle().pipe(
	fs.createWriteStream(
		path.join(__dirname, '../dist/server.js')
	)
);

var client = browserify({
	entries: [ path.join(__dirname, '../src/client.js') ],
	transform: babelify
});

client.bundle().pipe(
	fs.createWriteStream(
		path.join(__dirname, '../dist/public/bundle.js')
	)
);
