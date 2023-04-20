const {
    ActivityType
} = require("discord.js")

const client = require("../../index.js")
const mysql = require("../handlers/mysql/functions.js")
const logging = require("../handlers/console-log.js")

client.on('messageCreate', (message) => {
    if (message.author.bot || message.channel.type == "dm") return;
    const args = message.content.slice(client.prefix.length).trim().split(/ +/g);
    const name = args.shift().toLowerCase();

    var command = client.commands.get(name)

    if (client.config.mysql.enabled) {
        mysql.query(`SELECT * FROM ${client.config.mysql.connection.tables.config} WHERE guild = '${message.guild.id}'`, (rows) => {
            require("../handlers/mysql/messaging.js")(client, message)

            client.prefix = rows[0].prefix
            if (name.length == 0) return;

            if (!command) {
                if (client.commands.get(client.aliases.get(name)))
                    command = client.commands.get(client.aliases.get(name))
                else return
            }

            if (message.content.toLowerCase().indexOf(client.prefix) !== 0) return;

            command.run(client, message, args);

            // add aliases
            if (client.config.commandLogging) {
                logging.newLine("Command excuted.", true)
                logging.dropDown(`Command: ${command.name}`)
                logging.dropDown(`User: ${message.author.tag} (${message.author.id})`)
                logging.dropDown(`Guild: ${message.guild.name} (${message.guildId})`)
            }
        })

    } else {
        if (name.length == 0) return;

        if (!command) {
            if (client.commands.get(client.aliases.get(name)))
                command = client.commands.get(client.aliases.get(name))
            else return
        }

        if (message.content.toLowerCase().indexOf(client.prefix) !== 0) return;

        command.run(client, message, args);

        // add aliases
        if (client.config.commandLogging) {
            logging.newLine("Command excuted.", true)
            logging.dropDown(`Command: ${command.name}`)
            logging.dropDown(`User: ${message.author.tag} (${message.author.id})`)
            logging.dropDown(`Guild: ${message.guild.name} (${message.guildId})`)
        }
    }
})