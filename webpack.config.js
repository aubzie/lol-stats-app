const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/client/index.js",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            plugins: function () {
                                return [
                                    require("autoprefixer")
                                ];
                            }
                        }
                    }
                ]
            }
        ]
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            "/api": "http://localhost:8080"
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/index.html",
            filename: "index.html"
        })
    ]
}