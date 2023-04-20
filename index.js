const {
  Client,
  Collection,
  GatewayIntentBits
} = require("discord.js");

const client = new Client({
  fetchAllMembers: true,
  fetchAllChannels: true,
  fetchAllGuilds: true,
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});

client.config = require("./source/config.json");
client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.prefix = client.config.prefix;

client.login(client.config.token);

module.exports = client;
require("./source/handlers/initalization.js")(client);

process.removeAllListeners("warning");