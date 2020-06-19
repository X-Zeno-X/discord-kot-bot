const tools = require('../../../tools/tools.js');
const discord = require('../../../discord.js');

/**
 * Executes the command. It assigns various roles.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 3)
    {
        let arg = args.shift().toLowerCase();

        let user = args[0];
        let role = args[1];

        // Add a role to a guild member.
        if(arg === 'add')
        {
            if(tools.isMention(user))
            {
                role = discord.roleByID(role);
                if(role !== undefined)
                {
                    message.member.roles.add(role).then();
                }
            }
        }

        // Remove a role from a guild member.
        if(arg === 'remove')
        {
            if(tools.isMention(user))
            {
                role = discord.roleByID(role);
                if(role !== undefined)
                {
                    message.member.roles.remove(role).then();
                }
            }
        }
    }
}


module.exports =
    {
        execute: execute
    };