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
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                    outputPath: 'img'
                },
            }
        ]
    }
}