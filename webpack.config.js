const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackplugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: './index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@core': path.resolve(__dirname, 'src/core'),
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HTMLWebpackplugin({
            template: 'index.html'
        }),
        new CopyPlugin([
            {
                from: path.resolve(__dirname, 'src/favicon.svg'),
                to: path.resolve(__dirname, 'dist')
            },
        ]),
        new MiniCssExtractPlugin({
            filename: 'style.[hash].css'
        }),

    ]
}