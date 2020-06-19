const discord = require('../../../discord.js');
const tools = require('../../../tools/tools.js');
const quotes = require('../../../tools/quotes.js');
const twitch = require('../../../twitch.js');

/**
 * Posts a quote to a channel.
 *
 * @param channel  a target channel
 * @param quote  a target quote
 */
function post(channel, quote)
{
    if(quote.id === undefined)
        twitch.client().say(channel, quote.text);
    else
    {
        tools.lineCount('./data/quotes.txt')
            .then(count =>
            {
                let text = '[Quote ' + quote.id + '/' + count + '] \"';
                text += quote.text.replace(/<.*>/i, 'X');
                text += '\" ~' + quote.author;

                twitch.client().say(channel, text);
            })
    }
}

/**
 * Executes the command. It performs quote functions.
 *
 * @param channel  a target channel
 * @param args  optional arguments
 */
function execute(channel, args)
{
    // No arguments posts a random quote.
    if(args.length === 0)
    {
        quotes.load().then(quote =>
        {
            post(channel, quote);
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
            post(channel, quote);
        });
    }
}


module.exports =
    {
        execute: execute
    };