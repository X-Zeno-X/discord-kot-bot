const data = require('../../../game/loader.js');
const config = require('../../../game/config.js');
const tools = require('../../../tools/tools.js');
const discord = require('../../../discord.js');

// Defines the target being bonked.
let bonker = undefined;
let bonkee = undefined;

/**
 * Executes the command. It bonks someone in the face.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // Temporary shutdown.
    return;

    if(args.length === 1)
    {
        let arg = args.shift();
        if(tools.isMention(arg))
        {
            // If the batter is taking a swing...
            let rlBatter = discord.roleByID('RL_BATTER');
            if(rlBatter.members.has(message.member.id))
            {
                // And no target is assigned yet...
                if(bonker === undefined && bonkee === undefined)
                {
                    // Assign the bonk target.
                    bonker = message.member.id;
                    bonkee = tools.toSnowflake(arg);
                    if(bonker === bonkee)
                    {
                        let image = './images/rpg/bonk_self.jpg';
                        let text  = '<@' + message.member.id + '> bonked himself in the head! WHAT A RETARD!';
                        message.channel.send(text, {files: [image]}).then();
                        data.addBuff(bonkee, 'BF_BONKED');

                        setTimeout(() => confusion(message), 16000);
                        return;
                    }

                    if(data.exists(bonkee))
                        setTimeout(() => bonk(message), 4000);
                    else
                    {
                        message.channel.send('<@' + bonker + '> Your target has no character sheet!')
                        bonker = undefined; bonkee = undefined;
                    }
                }
            }
        }

        if(arg === 'evade')
        {
            if(message.member.id === bonkee)
            {
                let dex1 = data.loadChar(bonkee).stats.find(stat => stat.id === 'dex');
                let dex2 = data.loadChar(bonker).stats.find(stat => stat.id === 'dex');
                if(!data.challenge(dex1, dex2))
		            message.channel.send('<@' + message.member.id + '> failed to evade the bonk!');
		        else
                {
                    message.channel.send('<@' + message.member.id + '> evades the bonk! Nothin personell, kid');
                    data.addExperience(message.member.id, 3);
                    bonkee = undefined;

                    setTimeout(() => bonker = undefined, 4000);
                }
            }
        }

        if(arg === 'who')
        {
            let batters = discord.roleByID('RL_BATTER').members.array();
            if(!batters.some(batter => {return true;}))
		        message.channel.send('There is no batter right now.');
	        else
            {
		        let text = '';
		        for(let i = 0; i < batters.length; i++)
		        {
		            if(i !== 0) text += ', ';
		            text += '<@' + batters[i].id + '>';
		        }

		        message.channel.send(text + ' is the batter! Go !bonk somebody');
            }   
        }

        if(arg === 'random')
        {
            if(message.member.id === discord.memberFlake('ELEA'))
            {
                let char = data.randomChar();
                let role = discord.roleByID('RL_BATTER');
                let user = discord.memberByFlake(char.id);
                user.roles.add(role).then();
            }
        }

        if(arg === 'print')
        {
            message.channel.send('Bonker: ' + bonker + ', Bonkee: ' + bonkee);
        }
    }
}

function confusion(message)
{
    let role = discord.roleByID('RL_BATTER');

    message.member.roles.remove(role).then();
    message.channel.send('<@' + bonker + '> You are no longer the batter!');
    data.removeBuff(message.member.id, 'BF_BONKED');

    bonkee = undefined;
    bonker = undefined;

    let char = data.randomChar();
    let user = discord.memberByFlake(char.id);
    user.roles.add(role).then();
}

function bonk(message)
{
    if(bonkee === undefined)
    {
        bonker = undefined;
        return;
    }

    let image = './images/rpg/bonk_other.jpg';
    let text  = '<@' + bonker + '> bonked <@' + bonkee + '> square in the face!';
    message.channel.send(text, {files: [image]}).then
    (() => {

        let rlBatter = discord.roleByID('RL_BATTER');

        message.member.roles.remove(rlBatter).then();
        message.channel.send('<@' + message.member.id + '> You are no longer the batter!');
        data.addExperience(message.member.id, 3);
        data.addBuff(bonkee, 'BF_BONKED');

        let copy = '' + bonkee;

        bonkee = undefined;
        bonker = undefined;

        setTimeout(() =>
        {
            let user = discord.memberByFlake(copy);
            data.removeBuff(copy, 'BF_BONKED');
            user.roles.add(rlBatter).then();
        }, 20000);
    });
}


module.exports =
    {
        execute: execute
    };