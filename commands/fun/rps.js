const Discord = require("discord.js");

function rand(low, high) {
    return Math.random() * (high + 1 - low) + low | 0;
}

module.exports.run = async (client, message, args) => {

    if (args[0]) {
        let computer_choice = rand(0, 2);
        let user_choice = args[0] == "rock" ? 1 : args[0] == "paper" ? 2 : 0;

        if (computer_choice == user_choice) {

            let drawEmbed = new Discord.RichEmbed()
                .setColor("0x9400d3")
                .setTitle("**We got a draw.**")
            message.channel.send(drawEmbed);
        } else if (computer_choice < user_choice || computer_choice == 0 && user_choice == 2) {
            let botWinEmbed = new Discord.RichEmbed()
                .setColor("0x9400d3")
                .setTitle("**I have won.**")
            message.channel.send(botWinEmbed);
        } else {
            let winEmbed = new Discord.RichEmbed()
                .setColor("0x9400d3")
                .setTitle("**You have won!**")
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