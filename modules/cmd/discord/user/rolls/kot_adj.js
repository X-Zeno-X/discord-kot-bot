const discord = require('../../../../discord.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    // Write important happening to dev logs.
    console.log('Kot adjacent id got by ' + message.author.username + '.');

    // Post happening response to the author.
    message.channel.send('<@' + message.member.id + '>' + ' So close but not good enough.');

    // Remove the kot adjacent role from all members.
    let role = discord.roleByID('RL_KOTADJ');
    role.members.array().forEach(member =>
    {
        member.roles.remove(role).then();
    })

    // Add the kot adjacent role to the author.
    message.member.roles.add(role).then();
}

module.exports =
    {
        execute: execute
    };