const tools = require('../../../../tools/tools.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    let image = './images/desu.gif';
    let text = 'DESU' + tools.repeat(' DESU', tools.randomInt(10, 50));
    message.channel.send(text, {files: [image]});
}

module.exports =
    {
        execute: execute
    };