const tools = require('../../../../tools/tools.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    // Write important happening to dev logs.
    console.log('Bogdanoff id got by ' + message.author.username + '.');

    // Post happening response to the author.
    message.channel.send('Shut it down.', {files: ['./images/bog.jpg']});

    // Add the bogdanoff role to the author.
    let role = discord.roleByID('RL_BOGDANOFF');
    message.member.roles.add(role).then();

    // Update kot rpg buffs of the author.
    game.addBuff(message.member.id, 'BF_BOGDANOFF');
}

module.exports =
    {
        execute: execute
    };