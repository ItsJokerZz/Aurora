const Discord = require("discord.js");

function rand(low, high) {
    return Math.random() * (high + 1 - low) + low | 0;
}

module.exports.run = async (client, message, args) => {

    if (args[0]) {
        let computer_choice = rand(0, 2);
        let user_choice = args[0] == "rock" ? 1 : args[0] == "paper" ? 2 : 0;

        let drawEmbed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .description("**We got a draw.**")

        let botWinEmbed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .description("**I have won.**")

        let winEmbed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .description("**You have won!**")

        if (computer_choice == user_choice) {
            message.channel.send(drawEmbed);
        } else if (computer_choice < user_choice || computer_choice == 0 && user_choice == 2) {
            message.channel.send(botWinEmbed);
        } else {
            message.channel.send(winEmbed);
        }
    }

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setColor("0x9400d3")
            .setTitle("You must include a choice!")
            .setDescription("Example: j-rps rock")
        message.channel.send(embed);
    }
}

module.exports.help = {
    name: "rps"
}