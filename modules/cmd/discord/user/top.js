const tools = require('../../../tools/tools.js');
const score = require('../../../game/scores.js');

/**
 * Posts the scores in response to the message.
 *
 * @param message  a target message
 */
function scores(message)
{
    let data = score.load();
    data.forEach(value =>
    {
        value.user = message.guild.members.fetch(value.name);
        value.kot_multiplier = 'x' + value.kot_multiplier;
        value.kot_score = value.kot_score + '';
        value.gay_score = value.gay_score + '';
        value.rank = value.rank + '.';
    });

    Promise.all(data.map(value => value.user))
        .then(users =>
        {
            let headers = ['Rank', 'Name', 'Kot Score', 'Kot Mult.', 'Gay Power'];

            let s0 = Math.max(headers[0].length, data[data.length - 1].rank.length);
            headers[0] = tools.repeat(' ', s0 - headers[0].length) + headers[0];
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s0 - data[i].rank.length;
                data[i].rank = tools.repeat(' ', spaces) + data[i].rank;
            }

            let s1 = headers[1].length;
            for(let i = 0; i < data.length; i++)
            {
                s1 = Math.max(s1, users[i].displayName.length);
            }

            headers[1] = headers[1] + tools.repeat(' ', s1 - headers[1].length);
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s1 - users[i].displayName.length;
                data[i].name = users[i].displayName + tools.repeat(' ', spaces);
            }

            let s2 = Math.max(headers[2].length, data[0].kot_score.length);
            headers[2] = tools.repeat(' ', s2 - headers[2].length) + headers[2];
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s2 - data[i].kot_score.length;
                data[i].kot_score = tools.repeat(' ', spaces) + data[i].kot_score;
            }

            let s3 = headers[3].length;
            for(let i = 0; i < data.length; i++)
            {
                s3 = Math.max(s3, data[i].kot_multiplier.length);
            }

            headers[3] = headers[3] + tools.repeat(' ', s3 - headers[3].length);
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s3 - data[i].kot_multiplier.length;
                data[i].kot_multiplier = tools.repeat(' ', spaces) + data[i].kot_multiplier;
            }

            let s4 = headers[4].length;
            for(let i = 0; i < data.length; i++)
            {
                s4 = Math.max(s4, data[i].gay_score.length);
            }

            headers[4] = tools.repeat(' ', s4 - headers[4].length) + headers[4];
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s4 - data[i].gay_score.length;
                data[i].gay_score = tools.repeat(' ', spaces) + data[i].gay_score;
            }


            let text = '```';

            text += 'KOT ID LEADERBOARD' + '\n';
            text += '------------------' + '\n\n';

            text += headers[0] + ' ' + headers[1] + '  ';
            text += headers[2] + ' ' + headers[3] + '  ';
            text += headers[4] + '\n';

            for(let i = 0; i < data.length; i++)
            {
                text += data[i].rank  + ' ' + data[i].name + '  ';
                text += data[i].kot_score + ' ' + data[i].kot_multiplier + '  ';
                text += data[i].gay_score + '\n';
            }

            text += "```";

            message.channel.send(text);
        });
}

/**
 * Executes the command. It tests various functionalities.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    // No argument posts the leaderboards.
    if(args.length === 0)
    {
        scores(message);
        return;
    }

    let arg = args.shift();
    // If the next argument is a mention...
    if(tools.isMention(arg))
    {
        // Perform a specific score query.
        let id = tools.toSnowflake(arg);
        let data = score.load(id);
        let text = '';


	if(data === undefined)
            text += arg + ' has never acquired kot id because he is a LOSER.';
	else
        {
            if(data.kot_multiplier === 1)
                text += arg + ' has acquired ' + data.kot_score + ' kot id.';
            if(data.kot_multiplier > 1)
            {
                text += arg + ' has acquired ' + data.kot_score + ' kot id, ';
                text += 'once even ' + data.kot_multiplier + ' times in a row.';
            }

            if(data.gay_score > 0)
            {
		if(text !== '') text += ' ';
                text += arg + '\'s gay power level is ' + data.gay_score + '.';
            }
        }


        message.channel.send(text);
    }
}


module.exports =
    {
        execute: execute
    };