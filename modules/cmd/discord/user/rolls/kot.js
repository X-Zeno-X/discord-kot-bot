const discord = require('../../../../discord.js');
const score = require('../../../../game/scores.js');
const game = require('../../../../game/loader.js');

/**
 * Provides a special announce message depending on the multiplier.
 *
 * @param message  a target message
 * @param mult  a target multiplier
 */
function special(message, mult)
{
    if(mult === 5)
    {
        let chAnnounce = discord.channelByID('CH_ANNOUNCE');
        chAnnounce.send
        (
            'This kot ID get was the 5th in a row by <@' + message.member.id + '>.' + '\n' +
            'Let\'s all take a moment to celebrate this minor feat of autism.'
        );
    }

    if(mult === 10)
    {
        let chAnnounce = discord.channelByID('CH_ANNOUNCE');
        chAnnounce.send
        (
            'This kot ID get was the 10th in a row by <@' + message.member.id + '>.' + '\n' +
            'Let\'s all take a moment to celebrate this minor feat of autism.'
        );
    }
}

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    // Write important happening to dev logs.
    console.log('Kot id got by ' + message.author.username + '.');

    // Post happening response to the author.
    let chAnnounce = discord.channelByID('CH_ANNOUNCE');
    message.channel.send('MOTHERFUCKING KOT ID GET', {files: ["./images/happening.gif"]});
    chAnnounce.send('Ladies and gentlemen, ' + '<@' + message.member.id + '>' + ' has acquired kot ID.');

    // Acquire relevant roles.
    let rlGay = discord.roleByID('RL_GAYLORD');
    let rlKot = discord.roleByID('RL_KOTID');


    let mult = 1;
    // Remove the kot role from all members.
    rlKot.members.array().forEach(member =>
    {
	game.removeBuff(member.id, 'BF_KOTID');
        member.roles.remove(rlKot).then();
        if(member === message.member)
        {
            if(rlKot.name === "KOT")
                mult = 2;
            else
            {
                mult = rlKot.name.split("x")[1];
                mult = parseInt(mult) + 1;
            }
        }
    })

	special(message, mult);

    // Update the score board.
    score.updateKot(message.member.id, mult);
    if(mult > 1) rlKot.setName("KOT x" + mult).then();
    else rlKot.setName("KOT").then();

    // Update the roles of the author.
    message.member.roles.remove(rlGay).then();
    message.member.roles.add(rlKot).then();

    // Update kot rpg buffs of the author.
    game.addExperience(message.member.id, 4 * mult);
    game.removeBuff(message.member.id, 'BF_GAYLORD');
    game.addBuff(message.member.id, 'BF_KOTID');
}

module.exports =
    {
        execute: execute
    };