const common = require('./webpack.common');
const merge = require('webpack-merge');
const miniCssExtract = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "bundled.[contentHash].js",
        path: path.resolve(__dirname, "docs")
    },
    plugins: [
        new miniCssExtract({filename: "[name].[contentHash].css"}),
        new CleanWebpackPlugin()
    ], 
    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [miniCssExtract.loader, 'css-loader', 'sass-loader']
            }
        ]
    }
});