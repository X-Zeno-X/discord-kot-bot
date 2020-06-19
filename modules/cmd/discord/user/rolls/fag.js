const game = require('../../../../game/loader.js');
const score = require('../../../../game/scores.js');
const discord = require('../../../../discord.js');
const dicks = require('../dicks.js');

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    // Write important happening to dev logs.
    console.log('Gay id got by ' + message.author.username + '.');

    // Post happening response to the author.
    let chAnnounce = discord.channelByID('CH_ANNOUNCE');
    message.channel.send('<@' + message.member.id + '>' + ' Nice roll there, ' + dicks.slur() + '.');
    chAnnounce.send('<@' + message.member.id + '>' + ' really likes dicks.');

    // Update the score board.
    score.updateGay(message.member.id);

    // Add the gaylord role to the author.
    let rlGay = discord.roleByID('RL_GAYLORD');
    message.member.roles.add(rlGay).then();

    // Remove the bogdanoff role from the author.
    let rlBog = discord.roleByID('RL_BOGDANOFF');
    message.member.roles.remove(rlBog).then();

    // Update kot rpg buffs of the author.
    game.removeBuff(message.member.id, 'BF_BOGDANOFF');
    game.addBuff(message.member.id, 'BF_GAYLORD');
}

module.exports =
    {
        execute: execute
    };