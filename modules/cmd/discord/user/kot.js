const tools = require('../../../tools/tools.js');
const fs = require('fs');

/**
 * Executes the command. It replies with an image.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // No argument posts a random kot.
    if(args.length === 0)
    {
        let image = tools.randomFile('./images/kot');
        let value = image.split('_')[1].split('.')[0];
        let text = '<@' + message.member.id + '>' + ' Kot ' + value;
        message.channel.send(text, {files: [image]})
            .then(); return;
    }

    let arg = args.shift();
    // If the next argument is an integer...
    if(!isNaN(parseInt(arg)))
    {
        // Try to post a specific kot.
        let files = fs.readdirSync('./images/kot');

        let value = parseInt(arg);
        if(0 < value && value <= files.length)
        {
            let image = './images/kot/kot_' + value + '.png';
            let text = '<@' + message.member.id + '>' + ' Kot ' + value;
            message.channel.send(text, {files: [image]})
                .then(); return;
        }

        message.channel.send('404 kot not found');
    }
}


module.exports =
    {
        execute: execute
    };