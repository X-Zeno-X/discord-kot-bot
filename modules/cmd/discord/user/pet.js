const tools = require('../../../tools/tools.js');
const file = './data/discord/pet.json';
const fs = require('fs');

/**
 * Executes the command. It calls you a nerd.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 0)
    {
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

    if(response !== undefined)
    {
	let text = '<@' + message.member.id + '> ' + response.text;
        let image = './images/pet/' + response.image;

        if(fs.existsSync(image))
        {
            message.channel.send(text, {files: [image]})
                .then();
        }
    }
}


module.exports =
    {
        execute: execute
    };