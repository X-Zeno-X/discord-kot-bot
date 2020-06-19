const discord = require('../../../discord.js');
const quotes = require('../../../tools/quotes.js');
const tools = require('../../../tools/tools.js');
const file = './data/quotes.txt';


/**
 * Posts a quote to a channel.
 *
 * @param channel  a target channel
 * @param quote  a target quote
 */
function post(channel, quote)
{
    if(quote.id === undefined)
        channel.send(quote.text);
    else
    {
        tools.lineCount(file)
            .then(count =>
            {
                let text = '[Quote ' + quote.id + '/' + count + '] \"';
                text += quote.text + '\" ~' + quote.author;

                channel.send(text);
            })
    }
}

/**
 * Executes the command. It performs quote functions.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // No arguments posts a random quote.
    if(args.length === 0)
    {
        quotes.load().then(quote =>
        {
            post(message.channel, quote);
        }); return;
    }

    let arg = args.shift();
    // If the next argument is an integer...
    if(!isNaN(parseInt(arg)))
    {
        let value = parseInt(arg);
        // Try to post a specific quote.
        quotes.load(value).then(quote =>
        {
            post(message.channel, quote);
        }); return;
    }

    // If the next argument is all..
    if(arg === 'all')
    {
	// Dump the quotes file.
	message.channel.send('', {files: [file]})
            .then(); return;
    }

    // If the next argument is add..
    if(arg === 'add')
    {
        // Try to add a quote to the database.

        let arg = args.shift();
        if(!tools.isMention(arg)) return;
        if(args.length === 0) return;

        quotes.save({
            author: arg,
            text: args.join(' ').trim()
        });
	
	quotes.count().then(count =>
	{
	    let mention = message.member.toString();
	    message.channel.send(mention + ' Quote ' + count + ' added.');
	});
    }
}


module.exports =
    {
        execute: execute
    };