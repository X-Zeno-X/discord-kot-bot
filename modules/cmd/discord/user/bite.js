const tools = require('../../../tools/tools.js');
const file = './data/discord/bite.json';
const fs = require('fs');

/**
 * Executes the command. It calls you a nerd.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // Fetch a response from the database.
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let response = data.find(val => val.id === message.member.id);

    if(response !== undefined)
    {
        let image = './images/bite/' + response.image;

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