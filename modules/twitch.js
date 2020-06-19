const config = require('../data/config.json');
const fs = require('fs');


// The Twitch client handler.
let twtClient = undefined;

/**
 * Returns the Twitch client being used.
 */
function client()
{
    return twtClient;
}

function login()
{
    twtClient = new (require('tmi.js')).Client(config.twitch_login);
    twtClient.on('message', (channel, user, message, self) =>
    {
        if(self) return;

        // Split the message into its necessary parts.
        let args = message.slice(config.prefix.length);
        args = args.split(' ').filter(text => text !== '');
	if(args.length === 0) return;

        const command = args.shift().toLowerCase();

        // If it is a valid user command...
        let cmdUser = config.twitch_cmds + 'user/' + command + '.js';
        if(fs.existsSync(cmdUser))
        {
            // Run it as a user command.
            require('.' + cmdUser).execute(channel, args);
        }
    });
    twtClient.on('join', (channel, username, self) =>
    {
	if(self) return;
	
	require('./cmd/twitch/user/hello.js').random().then
	(
	    greet => twtClient.say(channel, greet + ', ' + username + '.')
	);
    });

    return twtClient.connect();
}


module.exports =
    {
        client: client,
        login: login
    };