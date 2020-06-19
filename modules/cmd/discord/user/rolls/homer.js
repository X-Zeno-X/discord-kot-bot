const tools = require('../../../../tools/tools.js');

/**
 * Executes the roll. It posts Homer copypasta.
 *
 * @param message  a target message
 * @param id  a target id
 */
function execute(message, id)
{
    let text = 'Okay, real talk. This retard club is a never-ending roller coaster stuck on the path'
    text += ' from being moderately shit to overwhelmingly shit, and frankly, I blame the autistic belgian for turning'
    text += ' the place into a cancerous circlejerk, shitposting americans, and braindamaged russians who roll kot id'
    text += ' like autists.\n\n Because of you three groups, good posters like... wait nevermind there have never been'
    text += ' any good posters. I don\'t mind a little shitposting here and there, but with your irrational childish'
    text += ' behaviors and your lack of moderation, you\'re the only ones who are ruining the server for the current'
    text += ' posters and future posters.\n\n I\'d tell you to sort your shit or fuck off, but who am I kidding, this'
    text += ' entire server is a haven for menchildren and I know that you\'ll just double down on your cancerous'
    text += ' behavior after you read this post. \n\n I only wanted to share my mind on this subject, and now'
    text += ' that I\'m done doing so, I no longer give a damn.';

    message.channel.send(text, {files: ['./images/homer.png']});
}

module.exports =
    {
        execute: execute
    };