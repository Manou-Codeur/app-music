const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ["./js/app.js"],
    plugins: [
        new HtmlWebpackPlugin({template: "./template.html"})
    ],
    module: {
        rules: [
            {
                test: /\.html$/,
                use: ["html-loader"]
            }
        ]
    }
}