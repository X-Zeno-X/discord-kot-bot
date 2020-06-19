const tools = require('../../../tools/tools.js');

/**
 * Executes the command. It calls you a nerd.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 1)
    {
	let arg = args.shift();
	if(tools.isMention(arg))
	{
	    let video = './images/nerd.mp4';
	    message.channel.send(arg, {files: [video]});
	}
    }
}


module.exports =
    {
        execute: execute
    };