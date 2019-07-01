const Discord = require("discord.js");

module.exports = async (client, message, args, con, prefix) => {
    let hex = args[0];

    function isHex() {
        isValid = /^[0-9a-fA-F]+$/;

        if (isValid.test(hex)) {
            return true;
        } else {
            return false;
        }
    }

    if (hex.includes("#")) {
        hex = hex.replace("#", "")
    }

    let r = args[0];
    let g = args[1];
    let b = args[2];

    var rgbToHex = function (rgb) {
        var hex = Number(rgb).toString(16);
        if (hex.length < 2) {
            hex = "0" + hex;
        }
        return hex;
    };

    var fullColorHex = function (r, g, b) {
        var red = rgbToHex(r);
        var green = rgbToHex(g);
        var blue = rgbToHex(b);
        return red + green + blue;
    };

    let color;

    if (!args[0]) {
        let embed = new Discord.RichEmbed()
            .setTitle("Error Performing Command")
            .setColor("0xF00000")
            .addField("Reason", "Missing Argument")
            .addField("Usages", `${prefix}testcolor <r, g, b>\ntestcolor <Hex Value>`, true)
            .addField("Examples", `${prefix}testcolor 25, 50, 75\ntestcolor F00000`, true)
        message.channel.send(embed);
    } else {
        if (r && g && b) {
            if (r >= 1, g >= 1, b >= 1) {
                hex = fullColorHex(r, g, b)
                color = `${r}, ${g}, ${b}`;
            } else {
                message.channel.send("All the colors values must be equal to or greater than 1.")
            }
        }

        if (hex.length < 6) {
            message.channel.send(`${hex} is invalid hex value.\nReason: value is less than 6 characters.`)
        } else {
            if (hex.length > 6) {
                message.channel.send(`${hex} is invalid hex value.\nReason: value is greater than 6 characters.`)
            } else {
                if (!isHex(hex)) {
                    message.channel.send(`${hex} is invalid hex value.\nReason: The value doesn't exist.`)
                } else {
                    if (color != `${r}, ${g}, ${b}`) {
                        color = hex;
                    }

                    let url = `http://www.singlecolorimage.com/get/${hex}/275x100`;

                    let embed = new Discord.RichEmbed()
                        .setColor("0x0AA0A0")
                        .setTitle(`Here's how ${color} looks!`)
                        .setImage(url)
                        .setFooter(`Requested by ${message.author.username}#${message.author.discriminator}`)
                        .setTimestamp(message.author.presence.activity)
                    message.channel.send(embed);
                }
            }
        }
    }
}