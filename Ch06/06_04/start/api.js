var http = require('http');

var data = require('./data/inventory');

http.createServer(function (req, res) {

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(data));

    } else if (req.url === '/instock') {

        res.writeHead(200, { 'Content-Type': 'text/json' });
        res.end(JSON.stringify(listInStock(res)));

    } else if (req.url === '/onorder') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        
        res.end(JSON.stringify(listOnBackOrder(res)));

    } else {

        res.writeHead(400, {'Content-type': 'text/plain'});

        res.end('Whooops... Data not found');

    }

}).listen(3000);

console.log('Server listening on port 3000');

function listInStock(res) {

    return data.filter(function (item) {
        return item.avail === 'In stock';
    });
}

function listOnBackOrder(res) {

    return data.filter(function (item) {
        return item.avail === 'On back order';
    });
}