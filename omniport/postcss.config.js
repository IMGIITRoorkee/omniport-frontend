const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [require('postcss-preset-env'), tailwindcss],
    loaderOptions: {
        modules: {
            localIdentName: '[hash:base64:7]'
        },
        importLoaders: 1
    },
};
