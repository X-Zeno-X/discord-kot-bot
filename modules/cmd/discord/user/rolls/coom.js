const tools = require('../../../../tools/tools.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    let text = 'AAAAAAAH I\'M COOOOOOOOMING';
    let image = tools.randomFile('./images/coom');
    message.channel.send(text, {files: [image]});
}

module.exports =
    {
        execute: execute
    };