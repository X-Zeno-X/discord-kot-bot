const tools = require('../../../../tools/tools.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    let image = tools.randomFile('./images/smug');
    message.channel.send('', {files: [image]});
}

module.exports =
    {
        execute: execute
    };