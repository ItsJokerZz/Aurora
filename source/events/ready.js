const { ActivityType } = require("discord.js");
const client = require("../../index.js");
const logging = require("../handlers/console-log.js");

client.on("ready", () => {
  const presences = [
    `${client.config.prefix} help`,
    `${client.users.cache.filter(user => !user.bot).size + 1} Users!`,
    `${client.guilds.cache.size} Servers!`,
    "www.itsjokerzz.xyz",
    "Developed by ItsJokerZz.",
    "Coming BACK harder than EVER!",
  ];

  setInterval(() => {
    const randomPresence = presences[Math.floor(Math.random() * presences.length)];
    client.user.setActivity(randomPresence, { type: ActivityType.Watching });
  }, 5000);

  logging.success(`${client.user.tag} is online!`.bold, !client.config.mysql.enabled);
});
