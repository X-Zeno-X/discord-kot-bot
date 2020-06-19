/**
 * Executes the command. It dumps various data.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // Dumping requires an argument.
    if(args.length === 0) return;

    const arg = args.shift().toLowerCase();

    if(arg === 'channels') console.log(message.guild.channels.cache);
    if(arg === 'emojis') console.log(message.guild.emojis.cache);
    if(arg === 'members') console.log(message.guild.members.cache);
    if(arg === 'roles') console.log(message.guild.roles.cache);
    if(arg === 'guild') console.log(message.guild);
}


module.exports =
    {
        execute: execute
    };