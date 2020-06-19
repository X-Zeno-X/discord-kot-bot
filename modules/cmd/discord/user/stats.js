const data = require('../../../game/loader.js');
const config = require('../../../game/config.js');
const tools = require('../../../tools/tools.js');
const discord = require('../../../discord.js');

/**
 * Executes the command. It shows you your stats.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 0)
    {
        let char = data.loadChar(message.member.id);
        display(message, char);
    }

    if(args.length === 1)
    {
        let arg = args.shift();
        if(arg === 'reroll')
        {
            data.generateChar(message.member.id); checkBuffs(message);
            let char = data.loadChar(message.member.id);
            display(message, char);
        }

	if(tools.isMention(arg))
	{
	    let char = data.loadChar(tools.toSnowflake(arg));
            display(message, char);
	}
    }
}

/**
 * Displays character information.
 *
 * @param message  a target message
 * @param char  a target character
 */
function display(message, char)
{
    if(char === undefined)
    {
        message.channel.send('Use !stats reroll to create a character first.');
        return;
    }

    char.user = message.guild.members.fetch(char.id);
    char.user.then(user =>
    {
        // Create a header for the character display message.
        let header = user.displayName + ' the level ' + char.level + ' ' + char.class + '\n';
        header += tools.repeat('-', header.length - 1) + '\n';
        header += 'Experience: ' + char.exp + '\n';

        // Create stat messages.
        let attribs = [];

        let stypes = config.loadStats();
        char.stats.forEach(stat =>
        {
            let type = stypes.find(type => type.id === stat.id);
            attribs.push({id:stat.id, text:type.name});
        });


        let s0 = 0;
        attribs.forEach(attr => s0 = Math.max(s0, attr.text.length));
        attribs.forEach(attr =>
        {
            let spaces = s0 - attr.text.length;
            attr.text += tools.repeat(' ', spaces + 1);
        });


        let s1 = 0;
        char.stats.forEach(stat => s1 = Math.max(s1, tools.digits(stat.value)));
        attribs.forEach(attr =>
        {
            let stat = char.stats.find(stat => stat.id === attr.id);
            let spaces = s1 - tools.digits(stat.value);

            attr.text += tools.repeat(' ', spaces);
            attr.text += stat.value + ' ';
        });


        let s2 = 0;
        let bonuses = data.computeBonus(char);
        bonuses.forEach(bonus =>
        {
            bonus.size = tools.digits(Math.abs(bonus.value)) + (bonus.value < 0 ? 1 : 0);
            s2 = Math.max(s2, bonus.size);
        });
        attribs.forEach(attr =>
        {
            let bonus = bonuses.find(bonus => bonus.id === attr.id);
            let spaces = s2 - bonus.size;

            attr.text += '(';
            attr.text += tools.repeat(' ', spaces);
            attr.text += bonus.value + ')';
        });


        let buffs = '';
        for(let i = 0; i < char.buffs.length; i++)
        {
            if(i !== 0) buffs += ', ';
            buffs += char.buffs[i].name;
        }


        let text = '```' + header + '\n';
        attribs.forEach(attr => text += attr.text + '\n');
        text += '\n' + buffs + '```';

        message.channel.send(text);
    });
}

function checkBuffs(message, char)
{
    // Acquire relevant roles.
    let rlGay = discord.roleByID('RL_GAYLORD');
    let rlKot = discord.roleByID('RL_KOTID');

    if(message.member.roles.cache.has(rlGay.id))
        data.addBuff(message.member.id, 'BF_GAYLORD');
    if(message.member.roles.cache.has(rlKot.id))
        data.addBuff(message.member.id, 'BF_KOTID');
}


module.exports =
    {
        execute: execute
    };