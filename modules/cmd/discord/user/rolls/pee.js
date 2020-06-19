const discord = require('../../../../discord.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    let emoji = discord.emojiByID('EM_ESTROGEN');
    message.channel.send('<:' + emoji.name + ':' + emoji.id + '>');
}

module.exports =
    {
        execute: execute
    };