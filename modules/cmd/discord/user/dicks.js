const data = require('../../../../data/discord/gay.json');
const tools = require('../../../tools/tools.js');

/**
 * Generates a gay slur. If index is -1, the slur is random.
 *
 * @param index  a slur index
 * @returns {string}  a slur
 */
function generateSlur(index)
{
    if(index === undefined)
        return tools.randomElement(data.slurs);
    else
    {
        let id = parseInt(index);
        if(!isNaN(id))
        {
            if(0 <= id && id < data.slurs.length)
            {
                return data.slurs[id];
            }
        }
    }
}

/**
 * Executes the command. It tells the messenger he's gay.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    message.channel.send
    (
        '<@' + message.member.id + '>' + ' shut up, '
        + generateSlur() + '.'
    );
}


module.exports =
    {
        slur: generateSlur,
        execute: execute
    };