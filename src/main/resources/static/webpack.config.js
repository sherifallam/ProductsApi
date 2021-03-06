var path = require('path');

module.exports = {
    entry: ['babel-polyfill','./app.js'],
    devtool: 'source-map',
    cache: true,
    debug: true,
    output: {
        path: __dirname,
        filename: './built/bundle.js'
    },
    module: {
        loaders: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['es2015', 'stage-0', 'react']
            }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpg|gif|swf)$/,
                loader:'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    }
};