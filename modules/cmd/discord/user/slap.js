const data = require('../../../game/loader.js');
const tools = require('../../../tools/tools.js');
const discord = require('../../../discord.js');

/**
 * Executes the command. It slaps people.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    let arg = args.shift();
    if(arg === 'kot')
    {
        let image = './images/kot/kot_37.png';
        let text = 'OH YES MASTER CAN I HAVE ANOTHER';
        message.channel.send(text, {files: [image]});
	return;
    }

    if(args.length === 0)
    {
	if(tools.isMention(arg))
	{
	    let id = tools.toSnowflake(arg);
	    let member = discord.memberByFlake(id);
	    if(member.user.username === 'Judas-The buddhist')
	    {
		let image = './images/slap_sp.jpg';
		message.channel.send(arg, {files: [image]});
		return;
	    }

	    let image = './images/slap.png';
	    message.channel.send(arg, {files: [image]});
	    message.channel.send('<@' + message.member.id + '> +4XP!');
	    data.addExperience(message.member.id, 4);
        }
    }
}


module.exports =
    {
        execute: execute
    };