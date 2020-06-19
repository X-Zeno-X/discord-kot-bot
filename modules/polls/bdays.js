const file = './data/discord/bdays.json';
const discord = require('../discord.js');
const tools = require('../tools/tools.js');
const fs = require('fs');

/**
 * Returns the time-out of the poll.
 *
 * @returns {number}  a time-out value
 */
function timeOut()
{
    return 7200000;
}

/**
 * Updates the poll.
 */
function poll()
{
    let data = load();

    let curr = [];
    for(let i = 0; i < data.length; i++)
    {
        if(tools.isBirthday(data[i].date))
            curr.push(data[i]);
        else if(data[i].wish === true)
        {
            set(data[i].id, data[i].date, false);
        }
    }

    curr = curr.filter(bday =>
    {
        return bday.wish === false;
    });

    if(curr.length !== 0)
    {
        let rlRetard   = discord.roleByID('RL_RETARD');
        let chAnnounce = discord.channelByID('CH_ANNOUNCE');

        let text = rlRetard.toString() + ' Happy birthday to ';
        for(let i = 0; i < curr.length; i++)
        {
            if(i !== 0) text += ', ';
            text += '<@' + curr[i].id + '>';
            set(curr[i].id, curr[i].date, true);
        }
        text += '! :partying_face:';

        chAnnounce.send(text);
    }
}

/**
 * Loads a birthday from the database.
 *
 * @param id  a member id
 * @returns {[]|object}  a birthday
 */
function load(id)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));

    if(id !== undefined)
    {
        // If an argument is provided, retrieve one date.
        data = data.find(date => date.id === id);
        return {
                id:   id,
                date: new Date(1900, data.month, data.day),
                wish: data.wish
        };
    }
    else
    {
        let result = [];
        // Otherwise, retrieve all dates.
        for(let i = 0; i < data.length; i++)
        {
            result.push
            ({
                id:   data[i].id,
                date: new Date(1900, data[i].month, data[i].day),
                wish: data[i].wish
            });
        }

        return result;
    }
}

/**
 * Changes a birthday in the database.
 *
 * @param id  a user id
 * @param date  a birth date
 * @param wish  a wish state
 */
function set(id, date, wish)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Find or create a new data value for the update.
    let value = data.find(date => date.id === id);
    if(value === undefined)
    {
        value = createEntry(id);
        data.push(value);
    }

    // Update the birth date.
    value.month = date.getMonth();
    value.day = date.getDate();
    value.wish = wish;

    // Write the resulting data back to file.
    fs.writeFileSync(file, JSON.stringify(data));
}

/**
 * Removes a birthday from the database.
 *
 * @param id  a user id
 */
function remove(id)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data = data.filter(date => date.id !== id);

    // Write the resulting data back to file.
    fs.writeFileSync(file, JSON.stringify(data));
}

function createEntry(id)
{
    return {id:id, month:0, day:0, wish:false};
}


module.exports =
    {
	remove: remove,
        timeOut: timeOut,
        poll: poll,
        load: load,
        set: set
    };