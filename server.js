const http = require('http');
const path = require('path');
const fs = require('fs');

const PORT = 8083;
const HOST = 'localhost';

const index = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const server = http.createServer((req, res) => {

    let contentType;
    let extension = path.extname(req.url);
    let response = null;
    let code = fs.existsSync(path.join(__dirname, req.url)) ? 200 : 404;

    switch (extension) {
        case '.css':
            contentType = 'text/css';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;

        case '.js':
            contentType = 'text/javascript';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case '.ico':
            contentType = 'image/x-icon';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case '.png':
            contentType = 'image/png';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case '.jpg':
            contentType = 'image/jpg';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case '.svg':
            contentType = 'image/svg+xml';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case '.woff':
            contentType = 'font/woff';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case  '.woff2':
            contentType = 'font/woff2';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case  '.ttf':
            contentType = 'font/ttf';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case  '.eot':
            contentType = 'font/eot';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case  '.otf':
            contentType = 'font/otf';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case  '.json':
            contentType = 'application/json';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        case '.html':
            contentType = 'text/html';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8') ?? null;
            }
            break;
        default:
            contentType = 'text/html';
            if (code === 200 && req.url !== '/') {
                response = fs.readFileSync(path.join(__dirname, req.url), 'utf8');
            } else {
                response = index;
                code = 200;
            }
            break;
    }
    res.writeHead(code, {'Content-Type': contentType});
    return res.end(response);
});

server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});