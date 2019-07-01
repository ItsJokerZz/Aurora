const Discord = require('discord.js');
const client = new Discord.Client({
    fetchAllMembers: true,
    fetchAllChannels: true,
    fetchAllGuilds: true
});

client.commands = new Discord.Collection();
//client.alias = new Discord.Collection();

client.config = require('./Settings/config.json');
client.ascii = require('./Settings/console.json');

const mySQL = require('mysql');
var con = mySQL.createConnection({
    host: client.config.sqlHost,
    port: client.config.sqlPort,
    user: client.config.sqlUser,
    password: client.config.sqlPass,
    database: client.config.sqlDB
});

require('./Handlers/commands.js')(client);
require('./Handlers/errors.js')(client);
require('./Handlers/events.js')(client, con);

client.login(client.config.token);