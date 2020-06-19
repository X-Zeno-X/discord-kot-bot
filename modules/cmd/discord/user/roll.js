const config = require('../../../../data/discord/roll.json');
const tools = require('../../../tools/tools.js');

/**
 * Generates a randomized ID string.
 *
 * @param size  a string size
 * @returns {string}  a random ID
 */
function generateID(size)
{
    let result = '';
    for(let i = 0; i < size; i++)
    {
        result += tools.randomElement(config.chars);
    }

    return result;
}

/**
 * Executes the command. It rolls random IDs.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // If arguments are given, ignore.
    if(args.length !== 0) return;

    // Generate a random id.
    const id = generateID(8);
    // Post it to the target channel.
    message.channel.send('<@' + message.member.id + '> ' + id);

    // Check if the id contains valid results.
    let rolls = config.rolls.filter
    (roll =>
    {
        return new RegExp(roll['regex'], 'i').test(id);
    });

    // If no results found, bail.
    if(rolls.length === 0) return;

    // Find the highest ranked result.
    let result = rolls[0];
    for(let i = 0; i < rolls.length; i++)
    {
        if(result['rank'] > rolls[i]['rank'])
        {
            result = rolls[i];
        }
    }

    // Fire the result.
    require('./rolls/' + result['type'] + '.js').execute(message, id);
}

module.exports =
    {
        execute: execute
    };