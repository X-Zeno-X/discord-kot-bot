const fs = require('fs');

/**
 * Returns the amount of digits in an integer.
 *
 * @param n  a target integer
 * @returns {number}  a digit count
 */
function digits(n)
{
    return (Math.log10((n ^ (n >> 31)) - (n >> 31)) | 0) + 1;
}

/**
 * Checks if a text string is a valid mention.
 *
 * @param text  a target string
 * @returns {boolean}  a mention check
 */
function isMention(text)
{
    return /^<@!?(\d+)>$/.test(text);
//  return text.startsWith('<@!') && text.endsWith('>');
}

/**
 * Checks if a date is today.
 *
 * @param date  a target date
 * @returns {boolean}  a date check
 */
function isBirthday(date)
{
    const today = new Date();
    return today.getMonth() === date.getMonth()
        && today.getDate() === date.getDate();
}

/**
 * Returns the current time of day.
 *
 * @returns {string}  a current time
 */
function currTime()
{
    const today = new Date();
    let hh = today.getHours(); if(digits(hh) === 1) hh = ' ' + hh;
    let mm = today.getMinutes(); if(digits(mm) === 1) mm = ' ' + mm;
    let ss = today.getSeconds(); if(digits(ss) === 1) ss = ' ' + ss;
    return hh + ':' + mm + ':' + ss;
}

/**
 * Promises the line count of a text file.
 *
 * @param url  a target text file
 * @returns {Promise<number>}  a line count
 */
function lineCount(url)
{
    return new Promise(function(resolve, reject)
    {
        let count = 0;
        fs.createReadStream(url)
            .on('end', () => resolve(count))
            .on('data', chunk =>
            {
                for(let i = 0; i < chunk.length; i++)
                {
                    if(count === 0) count++;
                    if(chunk[i] === 10) count++;
                }
            });
    });
}

/**
 * Generates a random bounded integer.
 *
 * @param min  a minimum bound
 * @param max  a maximum bound
 * @returns {int}  a random integer
 */
function randomInt(min, max)
{
    return min + Math.floor(Math.random() * (max - min));
}

/**
 * Generates a random array element.
 *
 * @param array  a target array
 * @returns {*}  a random element
 */
function randomElement(array)
{
    return array[randomInt(0, array.length)];
}

/**
 * Generates a random Gaussian element.
 *
 * @param avg  the distribution average
 * @param dev  the distribution deviation
 * @returns {number}  a normal distributed number
 */
function randomGaussian(avg, dev)
{
    let u = Math.sqrt(-2.0 * Math.log(Math.random()));
    let v = Math.cos(  2.0 * Math.PI * Math.random());

    let rnd = u * v / 10.0 + 0.5;
    if(isNaN(rnd)) rnd = randomGaussian(avg, dev);
    if(rnd < 0 || 1 < rnd) rnd = randomGaussian(avg, dev);
    return avg * (2 * rnd + 1) - dev;
}

/**
 * Generates a random file from a folder.
 *
 * @param folder  a folder to generate from
 * @returns {string}  a random file
 */
function randomFile(folder)
{
    let files = fs.readdirSync(folder);
    let value = randomInt(1, files.length);
    return folder + '/' + files[value];
}

/**
 * Repeats a string a number of times.
 *
 * @param text  a target string
 * @param n  a repeat count
 * @returns {string}  a repeated string
 */
function repeat(text, n)
{
    let result = '';
    for(let i = 0; i < n; i++)
    {
        result += text;
    }

    return result;
}

/**
 * Turns a mention string into a snowflake.
 *
 * @param mention  a target string
 * @returns {string}  a snowflake
 */
function toSnowflake(mention)
{
    let match = mention.match(/^<@!?(\d+)>$/);
    if(match === null) return null;
    return match[1];

//  return mention.substring(3, mention.length - 1);
}

module.exports = {
    currTime: currTime,
    digits: digits,
    isMention: isMention,
    isBirthday: isBirthday,
    lineCount: lineCount,
    randomElement: randomElement,
    randomFile: randomFile,
    randomGaussian: randomGaussian,
    randomInt: randomInt,
    repeat: repeat,
    toSnowflake: toSnowflake
}