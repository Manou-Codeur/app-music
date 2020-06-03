const common = require('./webpack.common');
const merge = require('webpack-merge');
const miniCssExtract = require("mini-css-extract-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "bundled.[contentHash].js",
        path: path.resolve(__dirname, "docs")
    },
    optimization: {
        minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
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