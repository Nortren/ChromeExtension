const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const {ImageminWebpackPlugin} = require("imagemin-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const fs = require('fs');

function generateHtmlPlugins(templateDir) {
    const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir));
    return templateFiles.map(item => {
        const parts = item.split('.');
        const name = parts[0];
        const extension = parts[1];
        return new HtmlWebpackPlugin({
            filename: `${name}.html`,
            template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`),
            inject: false,
        })
    })
}

const htmlPlugins = generateHtmlPlugins('./Client/templates/');

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
    }, devServer: {
        host: '127.0.0.1',
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
            {from: 'Client/icon', to: 'Client/icon'},
        ]),
        new HtmlWebpackPlugin({
            template: "./Client/index.html"
        })
    ].concat(htmlPlugins),
    optimization: {
        // minimizer: [
        // 	new UglifyJSPlugin({ sourceMap: true }),
        // 	// new ImageminWebpackPlugin({
        // 	// 	test: /\.(png|jpe?g|gif|svg)$/,
        // 	// })
        // ],
    },

};
