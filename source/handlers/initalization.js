const fs = require("fs");
const logging = require("../handlers/console-log.js");

function loadEvents(client) {
    const events = fs.readdirSync("./source/events/").filter(file => file.endsWith(".js"));
    logging.newLine("Loading Events...".bold.italic, true);

    events.forEach(file => {
        const event = require(`../events/${file}`);
        if (event.name) client.events.set(event.name, event);
        logging.dropDown(`${file}`);
    });

    logging.newLine(events.length === 1 ? "1 event initialized." : `${events.length} events initialized.`.bold.italic);
}

function loadCommands(client, total = 0) {
    const folders = fs.readdirSync("./source/commands/");
    logging.newLine("Loading Commands...".bold.italic, true);

    folders.forEach(folder => {
        if (folder === "mysql" && !client.config.mysql.enabled) return;

        const commands = fs.readdirSync(`./source/commands/${folder}/`).filter(file => file.endsWith(".js"));
        commands.forEach((file) => {
            const command = require(`../../source/commands/${folder}/${file}`);
            if (command.name) client.commands.set(command.name, command);
            if (command.aliases) {
                command.aliases.forEach(alias => {
                    client.aliases.set(alias, command.name);
                });
            }

            logging.dropDown(`${folder} \\ ${file}`);

            total++;
        });
    });

    logging.newLine(total == 1 ? "1 command initialized." : `${total} commands initialized.`.bold.italic);
}

function showAsciiLogo(client) {
    const array = fs.readFileSync('./source/ascii-logo.txt', 'utf-8').split("\n");
    if (client.config.showAsciiLogo) {
        array.forEach(line => {
            console.log(line.rainbow.bold);
        });
    }
}

module.exports = client => {
    showAsciiLogo(client);
    require("./mysql/functions.js")(client, logging);
    loadEvents(client);
    loadCommands(client);
  };