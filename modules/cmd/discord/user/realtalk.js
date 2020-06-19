const homer = require('./rolls/homer.js');

/**
 * Executes the command. It calls you a nerd.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    if(args.length === 0)
    {
	homer.execute(message);
    }
}


module.exports =
    {
        execute: execute
    };