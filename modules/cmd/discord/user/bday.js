const bdays = require('../../../polls/bdays.js');
const tools = require('../../../tools/tools.js');
const discord = require('../../../discord.js');

/**
 * Posts the birth dates in response to the message.
 *
 * @param message  a target message
 */
function dates(message)
{
    let data = bdays.load();
    data.sort(function(a,b){return a.date - b.date});
    data.forEach(value =>
    {
        value.user = message.guild.members.fetch(value.id);
        value.date = toString(value.date);
    });

    Promise.all(data.map(value => value.user))
        .then(users =>
        {
            let headers = ['Name', 'Birthday'];

            let s0 = headers[1].length;
            for(let i = 0; i < data.length; i++)
            {
                s0 = Math.max(s0, users[i].displayName.length);
            }

            headers[0] = headers[0] + tools.repeat(' ', s0 - headers[0].length);
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s0 - users[i].displayName.length;
                data[i].name = users[i].displayName + tools.repeat(' ', spaces);
            }

            let s1 = headers[1].length;
            for(let i = 0; i < data.length; i++)
            {
                s1 = Math.max(s1, data[i].date.length);
            }

            headers[1] = headers[1] + tools.repeat(' ', s1 - headers[1].length);
            for(let i = 0; i < data.length; i++)
            {
                let spaces = s1 - data[i].date.length;
                data[i].date = data[i].date + tools.repeat(' ', spaces);
            }


            let text = '```';

            text += 'RETARD BIRTHDAYS' + '\n';
            text += '----------------' + '\n\n';

            text += headers[0] + ' ' + headers[1] + '\n';

            for(let i = 0; i < data.length; i++)
            {
                text += data[i].name  + ' ';
                text += data[i].date + '\n';
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
        dates(message);
        return;
    }

    if(args.length === 1)
    {
        let arg = args.shift();
	
	if(arg === 'remove')
	{	    
	    let id = message.member.id;
	    let emoji = discord.emojiByID('EM_SADKOT');
            let text = '<@' + id + '> Your birthday was removed. ' + emoji.toString();

	    message.channel.send(text);
	    bdays.remove(id);
	    return;
	}


        // If the next argument is a mention...
        if(tools.isMention(arg))
        {
            // Perform a specific score query.
            let id = tools.toSnowflake(arg);
            let bday = bdays.load(id);
            let text = '';


            if(bday === undefined)
                text += arg + ' didn\'t tell me his birthday yet';
            else
                text += arg + ' was born on ' + bday.date.toDateString() + '.';

            message.channel.send(text);
        }

        arg = arg.split('-');
        if(arg.length === 2)
        {
            let day = parseInt(arg[0]);
            let month = parseInt(arg[1]);

            if(!isNaN(day) && !isNaN(month))
            {
                let id = message.member.id;
                let date = new Date(1900, month - 1, day);
                let text = '<@' + id + '> Your birthday was set to ' + toString(date) + '.';

                bdays.set(id, date, false);
                message.channel.send(text);
            }
        }
    }
}

/**
 * Returns a string representing a birthday.
 *
 * @param date  a target date
 * @returns {String}  a birthday string
 */
function toString(date)
{
    return date.toLocaleString('en-us', {month: 'long', day: 'numeric'});
}


module.exports =
    {
        execute: execute
    };