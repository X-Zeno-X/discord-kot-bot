/**
 * Executes the command. It gives the messenger help.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    message.channel.send
    (
        '<@' + message.member.id + '> go read the rules channel, retard.'
    );
}


module.exports =
    {
        execute: execute
    };