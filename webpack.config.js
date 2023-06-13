const path = require('path')

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/public'),
        filename: 'bundle.js',
    },
    performance: {
        maxEntrypointSize: 1024000,
        maxAssetSize: 1024000
    },
    devServer: {
        publicPath: '/dist/public/',
        compress: true,
        port: 9000,
        hot: true,
    },
}