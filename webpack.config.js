const path = require('path');

let config = {
    entry: {
        index: ['./src/page/index/index.js'],
        login: ['./src/page/login/index.js']
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.js'
    }
};

module.exports = config;