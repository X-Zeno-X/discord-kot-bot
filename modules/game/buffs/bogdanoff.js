function statBonus(char)
{
    return [
        {id:'str', value:-2},
        {id:'end', value:-2},
        {id:'int', value: 1},
        {id:'wis', value: 1},
        {id:'cha', value: 2}
    ];
}

module.exports = {
  statBonus : statBonus
};