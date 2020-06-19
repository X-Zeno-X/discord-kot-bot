const config = require('./config.js');
const tools = require('../tools/tools.js');
const file = './data/game/data.json';
const fs = require('fs');

/**
 * Checks if a character exists in the data.
 *
 * @param id  a user id
 * @returns {boolean}  an existence state
 */
function exists(id)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let char = data.find(char => char.id === id);
    return char !== undefined;
}

/**
 * Challenges two stats against each other
 * @param s1  an attacking stat
 * @param s2  a  defending stat
 * @returns {boolean} true if the challenge succeeds
 */
function challenge(s1, s2)
{
    let r = Math.log(s1 / s2);
    let mark = (900 + r * (297 + r)) / 1800;
    return Math.random() < mark;
}

/**
 * Returns a random character.
 */
function randomChar()
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    return tools.randomElement(data);
}

/**
 * Generates a new character into the data.
 *
 * @param id  a user id
 * @returns {any}  an rpg character
 */
function generateChar(id)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));

    // Find or create a new data value for the character.
    let char = data.find(char => char.id === id);
    if(char === undefined)
    {
        char = createEntry(id);
        data.push(char);
    }


    char.exp = 0; char.level = 1;
    char.buffs = []; char.stats = [];
    // Roll random stats for the character.
    let stats = config.loadStats();
    stats.forEach(attr =>
    {
        char.stats.push(
            {
                id: attr.id,
                value:Math.round(tools.randomGaussian(10, 10))
            });
    });

    // Write the data.
    fs.writeFileSync(file, JSON.stringify(data));
    return char;
}

/**
 * Adds experience to a character.
 *
 * @param id  a character id
 * @param exp  experience value
 */
function addExperience(id, exp)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    data.find(char => char.id === id).exp += exp;
    fs.writeFileSync(file, JSON.stringify(data));
}

/**
 * Removes a buff from a character.
 *
 * @param id  a character id
 * @param buff  a buff id
 */
function removeBuff(id, buff)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));
    let char = data.find(char => char.id === id);

    let index = -1;
    for(let i = 0; i < char.buffs.length; i++)
    {
        if(char.buffs[i] === buff)
        {
            index = i;
            break;
        }
    }

    if(index === -1) return;
    char.buffs.splice(index, 1);
    fs.writeFileSync(file, JSON.stringify(data));
}

/**
 * Adds a buff to a character.
 *
 * @param id  a character id
 * @param buff  a buff id
 */
function addBuff(id, buff)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));

    let char = data.find(char => char.id === id);
    if(!char.buffs.includes(buff))
    {
        char.buffs.push(buff);
    }

    fs.writeFileSync(file, JSON.stringify(data));
}

/**
 * Computes stat bonuses for a character.
 *
 * @param char  a target character
 * @returns {[]}  a stat bonus array
 */
function computeBonus(char)
{
    let results = [];

    let stats = config.loadStats();
    stats.forEach(stat =>
    {
        results.push({id:stat.id, value:0});
    });

    let buffs = config.loadBuffs();
    char.buffs.forEach(buff =>
    {
        let target = buffs.find(val => val.id === buff.id);
        let boni = require('./buffs/' + target.result).statBonus(char);
        boni.forEach(bonus =>
        {
            let result = results.find(result => result.id === bonus.id);
            result.value += bonus.value;
        });
    });

    return results;
}

/**
 * Loads a character from the data.
 *
 * @param id  a user id
 * @returns {any}  an rpg character
 */
function loadChar(id)
{
    let data = JSON.parse(fs.readFileSync(file, 'utf8'));

    // If an argument is provided, retrieve one character.
    if(id !== undefined)
    {
        let char = data.find(char => char.id === id);
        if(char === undefined) return char;
        for(let i = 0; i < char.buffs.length; i++)
        {
            char.buffs[i] = config.loadBuffs(char.buffs[i]);
        }

        return char;
    }
    else
    {
        // Otherwise, retrieve all characters.
        data.sort(function(a, b)
        {
            return b.level - a.level;
        });

        data.forEach(char =>
        {
            for(let i = 0; i < char.buffs.length; i++)
            {
                char.buffs[i] = config.loadBuffs(char.buffs[i]);
            }
        });

        return data;
    }
}

function createEntry(id)
{
    return {id:id, class:"Shitposter", level:1, exp:0};
}


module.exports = {
    exists: exists,
    loadChar: loadChar,
    randomChar: randomChar,
    addExperience: addExperience,
    computeBonus: computeBonus,
    generateChar: generateChar,
    removeBuff: removeBuff,
    challenge: challenge,
    addBuff: addBuff
}