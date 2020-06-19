const tools = require('../../../tools/tools.js');
const file = './data/discord/die.json';
const fs = require('fs');

/**
 * Executes the command. It replies with an image.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // No argument means a reply with no u.
    if(args.length === 0)
    {
        message.channel.send('<@' + message.member.id + '>' + ' no u');
        return;
    }

    let name = args.join(' ');
    // Otherwise, join the other arguments.
    if(tools.isMention(name))
    {
        name = tools.toSnowflake(name);
    }

    // Fetch a response from the database.
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let response = data.find(val => val.name === name);

    // If no response has been found, no u.
    if(response === undefined)
        message.channel.send('<@' + message.member.id + '>' + ' no u');
    else
    {
        let image = './images/die/' + response.image;
        if(fs.existsSync(image))
        {
            message.channel.send(response.text, {files: [image]})
                .then();
        }
    }
}


module.exports =
    {
        execute: execute
    };