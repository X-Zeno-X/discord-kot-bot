const tools = require('../../../../tools/tools.js');

function identify(id)
{
    if(/b[e3]p[i1]s/i.test(id)) return 'BEPIS';
    if(/b[e3]n[i1]n/i.test(id)) return 'BENIN';
    if(/b[e3]n[i1]s/i.test(id)) return 'BENIS';
    if(/p[e3]n[i1]s/i.test(id)) return 'PENIS';
    return undefined;
}

/**
 * Executes the roll. It rolls random IDs.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    let pp = identify(id);
    if(pp !== undefined)
    {
        let image = './images/bepis.gif';
        let text = tools.repeat('HA', tools.randomInt(2, 8)) + ' ' + pp + ' ';
        if(tools.randomInt(0, 2) === 0) text += 'XD'; else text += ':D';
        text += tools.repeat('D', tools.randomInt(1, 6));

        message.channel.send(text, {files: [image]});
    }
}

module.exports =
    {
        execute: execute
    };