const discord = require('../../../discord.js');
const fs = require('fs');

/**
 * Executes the command. It shuts down kot bot.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 0) return;

    // The first argument is the channel.
    const id = args.shift().toUpperCase();
    // The second argument is the picture.
    const img = args.shift().toLowerCase();
    // The rest of the arguments are the text.
    const text = args.join(' ').trim();

    // Send the message over the requested channel.
    let channel = discord.channelByID(id);
    if(fs.existsSync('./images/' + img))
        channel.send(text, {files: ['./images/' + img]});
    else
        channel.send(text);
}


module.exports =
    {
        execute: execute
    };