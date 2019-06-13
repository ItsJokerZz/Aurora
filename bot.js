const Discord = require("discord.js");

const client = new Discord.Client({
    fetchAllMembers: true,
    fetchAllChannels: true,
    fetchAllGuilds: true
});

const fs = require("fs");
const mysql = require("mysql");

client.commands = new Discord.Collection();

fs.readdir("./commands/admin/", (err, file) => {
    let jsfiles = file.filter(f => f.split(".").pop() === "js");

    console.log(`\nLoading ${jsfiles.length} admin commands...`);
    if (err) console.error(err);

    let jsFile = file.filter(file => file.split(".").pop() === "js");
    if (jsFile.length <= 0) return console.log("No admin loaded!");

    jsFile.forEach((f, i) => {
        let props = require(`./commands/admin/${f}`);
        client.commands.set(props.help.name, props)
        console.log(`Loaded ${f}`);
    });
});

fs.readdir("./commands/fun/", (err, file) => {
    let jsfiles = file.filter(f => f.split(".").pop() === "js");

    console.log(`\nLoading ${jsfiles.length} fun commands...`);
    if (err) console.error(err);

    let jsFile = file.filter(file => file.split(".").pop() === "js");
    if (jsFile.length <= 0) return console.log("No fun commands loaded!");

    jsFile.forEach((f, i) => {
        let props = require(`./commands/fun/${f}`);
        client.commands.set(props.help.name, props)
        console.log(`Loaded ${f}`);
    });
});

fs.readdir("./commands/general/", (err, file) => {
    let jsfiles = file.filter(f => f.split(".").pop() === "js");

    console.log(`\nLoading ${jsfiles.length} general commands...`);
    if (err) console.error(err);

    let jsFile = file.filter(file => file.split(".").pop() === "js");
    if (jsFile.length <= 0) return console.log("No admin commands loaded!");

    jsFile.forEach((f, i) => {
        let props = require(`./commands/general/${f}`);
        client.commands.set(props.help.name, props)
        console.log(`Loaded ${f}`);
    });
});

fs.readdir("./commands/utility/", (err, file) => {
    let jsfiles = file.filter(f => f.split(".").pop() === "js");

    console.log(`\nLoading ${jsfiles.length} utility commands...`);
    if (err) console.error(err);

    let jsFile = file.filter(file => file.split(".").pop() === "js");
    if (jsFile.length <= 0) return console.log("No utility commands loaded!");

    jsFile.forEach((f, i) => {
        let props = require(`./commands/utility/${f}`);
        client.commands.set(props.help.name, props)
        console.log(`Loaded ${f}`);
    });
});

client.on("ready", () => {

    const activities_list = [
        'The prefix is a^',
        'Use "a^help" for assistance.',
        'Developed by ItsJokerZz.',
        'Created using JavaScript.',
        'Hosted using aws.com',
        `Currently in ${client.guilds.size} guilds.`,
        `${client.users.size} total users in guilds.`,
    ];
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        client.user.setActivity(activities_list[index]);
    }, 10000);

    console.log(`\nBot has started with...\n${client.users.size} users\n${client.guilds.size} guilds\n${client.channels.size} channels\n`);

    setInterval(() => {
        process.stdout.cursorTo(0);
        let uptime = Math.floor(process.uptime());
        let secs = Math.floor(uptime % 60);
        let days = Math.floor((uptime % 31536000) / 86400);
        let hours = Math.floor((uptime / 3600) % 24);
        let mins = Math.floor((uptime / 60) % 60);
        process.stdout.write(`Uptime: ${days}D ${hours}H ${mins}M ${secs}S`);
    }, 1000)

    var date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();

    if (hours == 0 || 00) {
        hours = 12
    }

    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    time = hours + ":" + minutes + " " + am_pm;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    var days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    var date = days[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    var dateTime = "Bot started on: " + date + " at " + time + " (UTC-4:00) Eastern Time\n"
    console.log(dateTime);

    exports.start = `Bot started on: ${date} at ${time} (UTC-4:00) Eastern Time`;
});

var con = mysql.createConnection({
    host: "HOST",
    port: "PORT",
    user: "PASSWORD",
    password: "PASSWORD",
    database: "DATABASE"
})

con.connect(err => {
    if (err) {
        console.log("\n\n", `${err}\n`, "Failed to connect the MySQL database!\nIf this keeps occuring contact ItsJokerZz#3022 on Discord.");
        process.kill(process.pid);
    } else {
        console.log("\nConnected to MySQL database!");
    }
});

setInterval(() => {
    con.query(`SELECT * FROM con_loop WHERE isOn = 1`, (err, rows) => {
        if (err) throw err;

        let loop;
        let time = rows[0].time + 1;

        loop = `UPDATE con_loop SET time = ${time} WHERE isOn = 1`;
        con.query(loop);
    })
}, 600000);

function generateXp() {
    let max = 30;
    let min = 10;

    return Math.floor(Math.random() * (max - min + 1)) + 10;
}

client.on("guildCreate", guild => {
    console.log(`\n\nGuild Update...\nJoined: ${guild.name}.\n${guild.memberCount} users\n${guild.channels.size} channels\n\n`);
});

client.on("guildDelete", guild => {
    console.log(`\n\nGuild Update...\nRemoved from: ${guild.name}.\n${guild.memberCount} users\n${guild.channels.size} channels\n\n`);
});

client.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    con.query(`SELECT * FROM aurora WHERE id = '${message.author.id}'`, (err, rows) => {

        if (err) throw err;

        let sql;

        if (rows.length < 1) {
            sql = `INSERT INTO aurora (id, xp, msgs, blocked) VALUES ('${message.author.id}', ${generateXp()}, '0', '1')`;
        } else {
            let xp = rows[0].xp;
            let msgs = rows[0].msgs + 1;

            sql = `UPDATE aurora SET xp = ${xp + generateXp()}, msgs = '${msgs}' WHERE id = '${message.author.id}'`;
        }
        con.query(sql);
    });

    let prefix = ("a^")
    let msgArray = message.content.split(" ");
    let cmd = msgArray[0].toString();
    let args = msgArray.slice(1);

    if (message.content.indexOf(prefix) !== 0) return;

    let cmdFile = client.commands.get(cmd.slice(prefix.length));
    if (cmdFile) cmdFile.run(client, message, args, con);

    if (cmd === prefix) {
        let embed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .setTitle("Missing Argument")
            .setDescription('You must include a command after "a^"\nUse "a^help" for a list of commands.')
        message.channel.send(embed)
    } else {
        if (!cmdFile) {
            let embed = new Discord.RichEmbed()
                .setColor("0x9400d3")
                .setTitle("Unknown Command")
                .setDescription('Use "a^help" for a list of commands.')
            message.channel.send(embed);
        }
    }
});

client.login("TOKEN GOES HERE");