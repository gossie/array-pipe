const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build'),
        library: 'array-pipe',
        libraryTarget: 'umd',
        umdNamedDefine: true
    }
}
