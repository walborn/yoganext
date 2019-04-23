const withStylus = require('@zeit/next-stylus');
module.exports = withStylus({
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 2,
        localIdentName: "[local]___[hash:base64:6]",
    }
});
