const data = require('../data/discord.json');
const config = require('../data/config.json');
const fs = require('fs');


// The Discord client handler.
let dscClient = undefined;

/**
 * Returns the Discord client being used.
 */
function client()
{
    return dscClient;
}

/**
 * Logs in to the Discord client.
 */
function login()
{
    dscClient = new (require('discord.js')).Client();
    dscClient.on('message', message =>
    {
        // Skip messages that don't have a member.
        if(message.member === null) return;
        // Skip messages that don't have the prefix.
        if(!message.content.startsWith(config.prefix)) return;
        // Skip messages from the bot itself.
        /*if(message.member.id === memberFlake('KOTBOT')) return;*/

        /*
        if(message.member.id !== memberFlake('ELEA'))
        {
            message.channel.send('Wait a few seconds retard I\'m finishing up something.');
            return;
        }*/


        // Split the message into its necessary parts.
        let args = message.content.slice(config.prefix.length);
        args = args.split(' ').filter(text => text !== '');
        const command = args.shift().toLowerCase();


        // If it is a valid user command...
        let cmdUser = config.discord_cmds + 'user/' + command + '.js';
        if(fs.existsSync(cmdUser))
        {
            // Run it as a user command.
            require('.' + cmdUser).execute(message, args);
            return;
        }


        // If it is a valid dev command...
        let cmdDev = config.discord_cmds + 'dev/' + command + '.js';
        if(fs.existsSync(cmdDev))
        {
            // And I am not calling it...
            if(message.member.id !== memberFlake('ELEA'))
                message.channel.send('Stop trying to mess with the dev tools retard.');
            else
            {
                // Otherwise run it as a dev command.
                require('.' + cmdDev).execute(message, args);
            }
        }
    });

    return dscClient.login(config.discord_login);
}


// Discord snowflake getters.

/**
 * Returns the snowflake of a guild channel.
 *
 * @param id  a channel id
 * @returns {*}  a channel snowflake
 */
function channelFlake(id)
{
    return data.channels.find(channel => channel.id === id)['flake'];
}

/**
 * Returns the snowflake of a guild emoji.
 *
 * @param id  an emoji id
 * @returns {*}  an emoji snowflake
 */
function emojiFlake(id)
{
    return data.emojis.find(emoji => emoji.id === id)['flake'];
}

/**
 * Returns the snowflake of a guild member.
 *
 * @param id  a member id
 * @returns {*}  a member snowflake
 */
function memberFlake(id)
{
    return data.members.find(member => member.id === id)['flake'];
}

/**
 * Returns the snowflake of a guild role.
 *
 * @param id  a role id
 * @returns {*}  a role snowflake
 */
function roleFlake(id)
{
    return data.roles.find(role => role.id === id)['flake'];
}


// Discord object getters.

/**
 * Returns a Discord guild channel.
 *
 * @param id  a channel id
 * @returns {Channel}  a channel
 */
function channelByID(id)
{
    return channelByFlake(channelFlake(id));
}

/**
 * Returns a Discord guild emoji.
 *
 * @param id  an emoji id
 * @returns {GuildEmoji}  an emoji
 */
function emojiByID(id)
{
    return emojiByFlake(emojiFlake(id));
}

/**
 * Returns a Discord guild member.
 *
 * @param id  a member id
 * @returns {GuildMember}  a member
 */
function memberByID(id)
{
    return memberByFlake(memberFlake(id));
}

/**
 * Returns a Discord guild role.
 *
 * @param id  a role id
 * @returns {Role}  a role
 */
function roleByID(id)
{
    return roleByFlake(roleFlake(id));
}

/**
 * Returns a Discord guild channel.
 *
 * @param flake  a channel flake
 * @returns {Channel}  a channel
 */
function channelByFlake(flake)
{
    return guild().channels.resolve(flake);
}

/**
 * Returns a Discord guild emoji.
 *
 * @param flake  an emoji flake
 * @returns {GuildEmoji}  an emoji
 */
function emojiByFlake(flake)
{
    return guild().emojis.resolve(flake);
}

/**
 * Returns a Discord guild member.
 *
 * @param flake  a member flake
 * @returns {GuildMember}  a member
 */
function memberByFlake(flake)
{
    return guild().members.resolve(flake);
}

/**
 * Returns a Discord guild role.
 *
 * @param flake  a role flake
 * @returns {Role}  a role
 */
function roleByFlake(flake)
{
    return guild().roles.resolve(flake);
}

/**
 * Returns the Discord guild.
 *
 * @returns {Guild}  a guild
 */
function guild()
{
    return dscClient.guilds.resolve(data.id);
}


module.exports =
    {
        client: client,
        login: login,

        channelFlake: channelFlake,
        emojiFlake: emojiFlake,
        memberFlake: memberFlake,
        roleFlake: roleFlake,

        channelByID: channelByID,
        emojiByID: emojiByID,
        memberByID: memberByID,
        roleByID: roleByID,

        channelByFlake: channelByFlake,
        emojiByFlake: emojiByFlake,
        memberByFlake: memberByFlake,
        roleByFlake: roleByFlake,

        guild: guild
    };
