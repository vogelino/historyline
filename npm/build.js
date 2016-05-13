var browserify = require('browserify');
var babelify = require('babelify').configure(babelConfig);
var path = require('path');
var fs = require('fs');
var babelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../.babelrc')));
var transformConfig = [ ['babelify', babelConfig] ];

// CLIENT BUNDLE
browserify({
	entries: [ path.join(__dirname, '../src/client.js') ],
	transform: transformConfig
}).bundle().pipe(
	fs.createWriteStream(
		path.join(__dirname, '../dist/bundle.js')
	)
);
