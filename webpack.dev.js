const common = require('./webpack.common');
const merge = require('webpack-merge');
const path = require("path");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "bundled.js",
        path: path.resolve(__dirname, "docs")
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'], 
            }
        ]
    }
});