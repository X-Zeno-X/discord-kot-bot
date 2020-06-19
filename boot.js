const server = require('./modules/server.js');
const discord = require('./modules/discord.js');
const twitch = require('./modules/twitch.js');

// Enable the kot bot server.
server.connect();

// Log the kot bot in to Discord.
discord.login().then
(
	result => console.log('Discord: ' + result),
	result => console.log('Discord: ' + result)
);

// Log the kot bot in to Twitch.
twitch.login().then
(
	result => console.log('Twitch: ' + result),
	result => console.log('Twitch: ' + result)
);