const discord = require('../../../discord.js');

/**
 * Executes the command. It shuts down kot bot.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 0)
    {
        console.log('I\'m fucking off then!');
        discord.client().destroy();
    }
}


module.exports =
    {
        execute: execute
    };