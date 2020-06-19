const discord = require('../../discord.js');

function statBonus(char)
{
    let rlKot = discord.roleByID('RL_KOTID');
    let args = rlKot.name.split('x');

    let add = 0;
    if(args.length === 2)
    {
	let mult = parseInt(args[1]);
	add = Math.log(mult) / Math.log(2);
    }


    return [
        {id:'str', value: 2 + add},
        {id:'dex', value: 2 + add},
        {id:'end', value: 2 + add},
        {id:'int', value: 2 + add},
        {id:'wis', value: 2 + add},
        {id:'cha', value: 2 + add}
    ];
}

module.exports = {
  statBonus : statBonus
};