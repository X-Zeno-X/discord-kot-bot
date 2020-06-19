const discord = require('../discord.js');
const tools = require('./tools.js');
const file = './data/quotes.txt';
const fs = require('fs');

/**
 * Counts the quotes in the database.
 *
 * @returns {Promise<Number>}  a quote count
 */
function count()
{
    return tools.lineCount(file);
}

/**
 * Loads a quote from the database.
 *
 * @param id  a quote id
 * @returns {Promise<quote>}  a quote
 */
function load(id)
{
    // If an argument exists, but it is not an id, ignore it.
    if(id !== undefined && isNaN(parseInt(id))) return undefined;

    return new Promise(function(resolve)
    {
        count().then
        (
            count =>
            {
                // If no quotes exist, return nothing.
                if(count === 0) return undefined;

                // If the id is undefined, return a random one.
                if(id === undefined)
                {
                    return tools.randomInt(0, count);
                }

                let value = parseInt(id);
                // If the id is within bounds, return it.
                if(0 < value && value <= count)
                    return value - 1;

                // Otherwise, return nothing.
                return undefined;
            }
        ).then
        (
            value =>
            {
                // If the value is undefined, return a default quote.
                if(value === undefined)
                {
                    let author = discord.memberByID('KOTBOT').displayName;
                    resolve({id:undefined, author:author, text:'Who are you quoting?'});
                }


                let quote = '';
                // Otherwise, load the requested quote.
                let stream = fs.createReadStream(file, 'utf8');

                stream.on('data', chunk =>
                    {
                        let curr = 0;
                        for(let i = 0; i < chunk.length; i++)
                        {
                            if(curr < value)
                            {
                                if(chunk[i] === '\n')
                                {
                                    curr++;
                                }
                            }
                            else
                            {
                                if(chunk[i] !== '\n')
                                    quote += chunk[i].toString();
                                else
                                {
                                    stream.destroy();
                                    return;
                                }
                            }
                        }
                    });

                stream.on('close', () =>
                {
                    let parts = quote.split(':');
		            for(let i = 1; i < parts.length; i++)
		            {
			            parts[i] = parts[i].replace(' \\n ', '\n');
		            }
		
		            let flake = tools.toSnowflake(parts.shift());
                    let author = discord.memberByFlake(flake).displayName;
		            let text = parts.join(':');

                    resolve({
                            id:value + 1,
                            author:author,
                            text:text
                    });
                });
            }
        );
    });
}

/**
 * Saves a quote to the database.
 *
 * @param quote  a target quote
 */
function save(quote)
{
    let line = quote.author + ':' + quote.text.replace('\n', ' \\n ');
    fs.appendFile(file, '\n' + line, function(err)
    {
        if(err)	console.log(err);
    });
}


module.exports =
    {
	count: count,
        load: load,
        save: save
    };