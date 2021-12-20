const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

require('dotenv').config();

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name][contenthash:8].bundle.js',
        assetModuleFilename: 'fonts/[name].[contenthash:8][ext]',
    },
    module: {
        rules: [{
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.mp3$/,
                type: 'asset/inline',
            },
            {
                test: /\.png$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]',
                },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Girl or Boy?',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
            favicon: './src/favicon.ico',
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            BABY_NAME: JSON.stringify(process.env.BABY_NAME),
            GENDER: JSON.stringify(process.env.GENDER),
        }),
    ],
};