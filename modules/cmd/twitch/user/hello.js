const file = './data/twitch/greetings.txt';
const tools = require('../../../tools/tools.js');
const twitch = require('../../../twitch.js');
const fs = require('fs');

/**
 * Executes the command. It says a very nice hello.
 *
 * @param channel  a target channel
 * @param args  optional arguments
 */
function execute(channel, args)
{
    random().then(greet =>
    {
	twitch.client().say(channel, greet + ', retard');
    });
}

function random()
{
    return new Promise(function(resolve)
    {
	tools.lineCount(file).then(count =>
	{
	    let index = tools.randomInt(0, count);
	    let stream = fs.createReadStream(file, 'utf8');

	    let quote = '';
	    stream.on('data', chunk =>
	    {
		let curr = 0;
		for(let i = 0; i < chunk.length; i++)
		{
		    if(curr < index)
		    {
			if(chunk[i] === '\n')
			{
			    curr++;
			}
		    }
		    else
		    {
			if(chunk[i] !== '\n')
			    quote += chunk[i].toString();
			else
			{
			    stream.destroy();
			    return;
			}
		    }
		}
	    });

	    stream.on('close', () =>
	    {
		resolve(quote.trim());
	    });
	});
    });
}

module.exports =
    {
        execute: execute,
	random: random
    };