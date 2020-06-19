const tools = require('../../../tools/tools.js');

/**
 * Executes the command. It rolls dice.
 *
 * @param message  a target message
 * @param args  optional arguments
 */
function execute(message, args)
{
    let error = 'To roll dice, use the command !dice {k}d{n}, where k is the dice count and n is the dice size';
    if(args.length === 0)
    {
	message.channel.send(error);
	return;
    }

    if(args.length > 1) return;
    let vals = args.shift().split('d');
    if(vals.length !== 2) return;

    let count = parseInt(vals.shift());
    if(isNaN(count) || count <= 0) return;

    vals = vals[0].split('+');
    if(vals.length === 2)
    {
	if(count > 10)
	{
	    message.channel.send('Dice count is limited to 10. Please buy pass if you want more.');
	    return;
	}

	let size  = parseInt(vals[0]);
	if(isNaN(size) || size <= 0) return;
	let roll = parseInt(vals[1]);
	if(isNaN(roll)) return;

	for(let i = 0; i < count; i++)
	{
	    roll += tools.randomInt(1, size + 1);
	}

	message.channel.send('<@' + message.member.id + '> rolled ' + roll + '.');
	return;
    }

    vals = vals[0].split('-');
    if(vals.length === 2)
    {
	if(count > 10)
	{
	    message.channel.send('Dice count is limited to 10. Please buy pass if you want more.');
	    return;
	}

	let size  = parseInt(vals[0]);
	if(isNaN(size) || size <= 0) return;
	let roll = -parseInt(vals[1]);
	if(isNaN(roll)) return;

	for(let i = 0; i < count; i++)
	{
	    roll += tools.randomInt(1, size + 1);
	}

	message.channel.send('<@' + message.member.id + '> rolled ' + roll + '.');
	return;
    }

    if(vals.length === 1)
    {
	if(count > 10)
	{
	    message.channel.send('Dice count is limited to 10. Please buy pass if you want more.');
	    return;
	}

	let size  = parseInt(vals[0]);
	if(isNaN(size) || size <= 0) return;

	let roll = 0;
	for(let i = 0; i < count; i++)
	{
	    roll += tools.randomInt(1, size + 1);
	}

	message.channel.send('<@' + message.member.id + '> rolled ' + roll + '.');
	return;
    }
}

module.exports =
    {
        execute: execute
    };