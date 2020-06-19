const fs = require('fs');

/**
 * Loads buffs from the config file.
 *
 * @param id  a buff id
 * @returns {any}  a buff
 */
function loadBuffs(id)
{
    let data = JSON.parse(fs.readFileSync('./data/game/config/buffs.json', 'utf8'));
    if(id !== undefined) return data.find(buff => buff.id === id);
    return data;
}

/**
 * Loads stats from the config file.
 *
 * @param id  a stat id
 * @returns {any}  a stat
 */
function loadStats(id)
{
    let data = JSON.parse(fs.readFileSync('./data/game/config/stats.json', 'utf8'));
    if(id !== undefined) return data.find(stat => stat.id === id);
    return data;
}

module.exports = {
    loadBuffs: loadBuffs,
    loadStats: loadStats
}