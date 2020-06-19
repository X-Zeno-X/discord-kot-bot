/**
 * Executes the command. It says a nice hello.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 0)
    {
        let text = 'Greetings, retard';
        let image = './images/hello.jpg';
        
        message.channel.send(text, {files: [image]});
    }
}


module.exports =
    {
        execute: execute
    };