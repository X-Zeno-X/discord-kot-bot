const http = require('http');
const fs = require('fs');

/**
 * Connects the kot bot server.
 */
function connect()
{
    // Enable all the polls in the folder.
    let polls = fs.readdirSync('./modules/polls');
    polls.forEach(poll =>
    {
        let script = require('../modules/polls/' + poll);
        setInterval(script.poll, script.timeOut());
    });

    /*
    http.createServer(function (request, response)
    {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write('Hello World!');
        response.end();

    }).listen(8080);
    */
}

module.exports =
    {
        connect: connect
    };