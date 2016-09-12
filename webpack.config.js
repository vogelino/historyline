/* eslint-disable */
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { readFileSync } = require('fs');
const { name } = JSON.parse(readFileSync('package.json'));

module.exports = (env) => {
	return {
		entry: './scripts/index.js',
		output: {
			filename: 'bundle.js',
			path: resolve(__dirname, 'dist'),
			pathinfo: !env.prod
		},
		context: resolve(__dirname, 'src'),
		devtool: env.prod ? 'source-map' : 'eval',
		bail: env.prod,
		module: {
			loaders: [
				{ test: /\.js$/, loader: 'babel!eslint', exclude: /node_modules/ }
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: name,
				template: './resources/index.ejs'
			})
		]
	}
};
