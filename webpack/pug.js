module.exports = () => {
    process.traceDeprecation = true;
    return {
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    loader: 'pug-loader',
                    options: {
                        pretty: true
                    }
                }
            ]
        },
    }
};