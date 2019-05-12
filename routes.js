const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if(url === '/'){
        fs.readFile('./home.html', (err, html) => {
            if(err) {throw err}
        res.write(html.toString());
        return res.end();
        });
    }

    if(url === '/users'){
        fs.readFile('./users.html', (err, html) => {
            if(err) {throw err}
        res.write(html.toString());
        return res.end();
        });
    }

    if(url === '/createUser' && method === "POST"){
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            const parseBody = Buffer.concat(body).toString();
            const user = parseBody.split('=')[1];
            console.log(user);
            res.writeHead(301, {'Location': '/'});
            res.end();
        });
    }
}
module.exports = requestHandler;
