const fs = require('fs');
const path = require('path');

const render = async (url) => {
    if (url === '/favicon.ico') {
        return;
    }
    const fileName = '/' === url  ? 'index' : url.slice(1);
    const data = await fs.promises.readFile(path.join(__dirname, '..', 'static', fileName.concat('.html')));
    return data;
};

module.exports = render;