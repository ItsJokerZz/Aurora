module.exports = (client, con) => {
    client.on('ready', () => require('./Events/ready.js')(client, con));
    client.on('message', (message) => require('./Events/message.js')(client, message, con));

    client.on('guildMemberAdd', (member) => require('./Events/userJoin.js')(client, member, con));
    client.on('guildMemberRemove', (member) => require('./Events/userLeft.js')(client, member, con));

    client.on('guildDelete', (guild) => require('./Events/botLeft.js')(client, guild, con));
}