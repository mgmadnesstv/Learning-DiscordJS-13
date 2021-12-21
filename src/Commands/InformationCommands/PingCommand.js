const Discord = require("discord.js");


module.exports.run = async (Client, message, args, prefix) => {

    message.channel.send("pong")
}

module.exports.help = {
    name: "ping",
    aliases: ["p"]
}