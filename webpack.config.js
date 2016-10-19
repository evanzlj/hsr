var webpack = require('webpack');
module.exports = {
    entry: {
        entry: ['./dist/canvas.js'],
        vendor: ['redux','react','react-dom']
    },
    output: {
        path: './use/',
        filename: '[name].js',
        publicPath: '/use'
    },
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel', query: {presets: ['es2015', 'stage-0', 'react']}}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot:true,
        inline:true,
        port:7777
    }
};