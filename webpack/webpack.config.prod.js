const path = require('path');
const webpack = require('webpack');
const sourcePath = path.resolve(__dirname, '../src');
const publicPath = path.resolve(__dirname, '../docs');

module.exports = {
	entry: {
		'bundle': [
			`${sourcePath}/js/app.js`,
			`${sourcePath}/css/style.css`
		]
	},

	output: {
		filename: '[name].js',
		path: `${publicPath}/`,
	},

	module: {
		rules: [{
			test: /\.js$/,
			use: [{
				loader: 'babel-loader'
			}],
			exclude: /node_modules/
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader'],
			exclude: /node_modules/
		}]
	}
};