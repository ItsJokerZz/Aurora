const Discord = require('discord.js');
const client = new Discord.Client({
    fetchAllMembers: true,
    fetchAllChannels: true,
    fetchAllGuilds: true
});

client.config = require('./Settings/config.json');
client.commands = new Discord.Collection();

client.ascii = require('./Settings/console.json');

const mySQL = require('mysql');
var con = mySQL.createConnection({
    host: client.config.sqlHost,
    port: client.config.sqlPort,
    user: client.config.sqlUser,
    password: client.config.sqlPass,
    database: client.config.sqlDB
})

// Assistance Commands
client.commands.set('help', require('./Commands/Assistance/help.js'));
client.commands.set('support', require('./Commands/Assistance/support.js'));

// Guild Commands
client.commands.set('ban', require('./Commands/Guild/ban.js'));
client.commands.set('kick', require('./Commands/Guild/kick.js'));
client.commands.set('mute', require('./Commands/Guild/mute.js'));
client.commands.set('unmute', require('./Commands/Guild/purge.js'));
client.commands.set('report', require('./Commands/Guild/report.js'));
client.commands.set('unmute', require('./Commands/Guild/unmute.js'));

// Misc Commands
client.commands.set('8ball', require('./Commands/Misc/8ball.js'));
client.commands.set('flip', require('./Commands/Misc/flip.js'));
client.commands.set('invite', require('./Commands/Misc/invite.js'));
client.commands.set('roll', require('./Commands/Misc/roll.js'));
client.commands.set('tweet', require('./Commands/Misc/tweet.js'));

// Utility Commands
client.commands.set('stats', require('./Commands/Utility/stats.js'));
client.commands.set('ping', require('./Commands/Utility/ping.js'));

// Music Commands

// Error Handling
client.on('error', (error) => {
    console.log(`\nError:\n${error.stack}\n`);
});

process.on('unhandledRejection', (error) => {
    console.error(`\nUnhandled Rejection:\n${error.stack}\n`);
});

process.on('uncaughtException', (error) => {
    let errorMsg = (error ? error.stack || error : '').toString().replace(new RegExp(`${__dirname}/`, 'g'), './');
    console.log(`\n${errorMsg}\n`);
});

// Event Handling
client.on('ready', () => require('./Events/ready.js')(client, con));
client.on('message', (message) => require('./Events/message.js')(client, message, con));
client.on('disconnect', () => require('./Events/disconnect.js')(client));
client.on('reconnecting', () => require('./Events/reconnecting.js')(client));

client.login(client.config.token);