const path = require('path');
const sourcePath = path.resolve(__dirname, '../src');
const publicPath = path.resolve(__dirname, '../dist');
module.exports  = {
	devtool: 'source-map',
	entry: {
		'app': [
			'webpack-dev-server/client?http://localhost:3000',// host 與 port
    		'webpack/hot/only-dev-server',// "only" 可以避免在語法錯誤時重新載入
			'babel-polyfill',
            'react-hot-loader/patch',
			`${sourcePath}/js/app.js`
		]
	},
	output: {
		filename: 'bundle.js',
		path: `${publicPath}/js/`,
		publicPath: '../dist/js/'
	},
	context: __dirname,
	devServer: {
		contentBase: publicPath,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [{ loader: 'babel-loader' }],
				exclude: /node_modules/
			}
		]
	}
};