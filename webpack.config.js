/* eslint-disable */
const { resolve } = require('path');
const { readFileSync } = require('fs');
const { name } = JSON.parse(readFileSync('package.json'));
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
	return {
		entry: './scripts/index.js',
		output: {
			filename: 'bundle.js',
			path: resolve(__dirname, 'dist'),
			pathinfo: !env.prod,
			libraryTarget: 'umd'
		},
		context: resolve(__dirname, 'src'),
		devtool: env.prod ? 'source-map' : 'eval',
		bail: env.prod,
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel!eslint',
					exclude: /node_modules/
				},
				{
					test: /\.css/,
					loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]')
				},
				{
					test: /\.(eot|svg|ttf|woff|woff2)$/,
					loader: 'file?name=resources/fonts/[name].[ext]',
					include: resolve(__dirname, 'src/resources/fonts')
				},
				{
					test: /\.svg$/,
					loader: 'svg-sprite?name=resources/icons/[name]_[hash]',
					include: resolve(__dirname, 'src/resources/icons')
				}
			]
		},
		plugins: [
			new HtmlWebpackPlugin({
				title: name,
				template: './resources/index.ejs'
			}),
			new ExtractTextPlugin('styles.css'),
			new ExtractTextPlugin('sprite.svg')
		]
	}
};
