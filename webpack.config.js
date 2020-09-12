const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const {ImageminWebpackPlugin} = require("imagemin-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
// import ImageMinPlugin from 'imagemin-webpack-plugin';
// import CopyWebpackPlugin from 'copy-webpack-plugin';
module.exports = {
	entry: "./Client/App.js",
    devServer: {
        host: '127.0.0.1',
        compress: true,
        disableHostCheck: true
    },
	output: {
		path: path.join(__dirname, "/dist"),
		filename: "index-bundle.js"
	},  devServer: {
        host: '0.0.0.0',
	compress: true,
        disableHostCheck: true
    },
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|gif|jpe?g)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
						},
					},
					'img-loader',
				],
			},
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: 'Client/image', to: 'Client/image' },
		]),
		new HtmlWebpackPlugin({
			template: "./Client/index.html"
		})
	],
	optimization: {
		// minimizer: [
		// 	new UglifyJSPlugin({ sourceMap: true }),
		// 	// new ImageminWebpackPlugin({
		// 	// 	test: /\.(png|jpe?g|gif|svg)$/,
		// 	// })
		// ],
	},

};
