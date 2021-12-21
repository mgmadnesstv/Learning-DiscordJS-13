// Importing Packages
const Discord = require ("discord.js");
const fs = require ('fs');

// Config Files
const Config = require(`./Configs/Config.json`);
const Token = Config.token;

// Setting up Intents
const Client = new Discord.Client({
    intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MEMBERS, Discord.Intents.FLAGS.GUILD_BANS, Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Discord.Intents.FLAGS.GUILD_INTEGRATIONS, Discord.Intents.FLAGS.GUILD_INVITES, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING, Discord.Intents.FLAGS.GUILD_WEBHOOKS, Discord.Intents.FLAGS.GUILD_PRESENCES],
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true}
})

Client.commands = new Discord.Collection();
Client.aliases = new Discord.Collection();
Client.events = new Discord.Collection();
Client.slashCmds = new Discord.Collection;
module.exports.Client = Client;


// Commands Handler & Aliases

fs.readdirSync('./commands/').forEach(dir => {
    fs.readdir(`./commands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        jsFiles.forEach(file => {
            var fileGet = require(`./commands/${dir}/${file}`);
            console.log(`[Commands] File ${file} was loaded`)
            try {
                Client.commands.set(fileGet.help.name, fileGet);
                fileGet.help.aliases.forEach(alias => {
                    Client.aliases.set(alias, fileGet.help.name);
                })
            } catch (err) {
                return console.log(err);
            }
        });
    });
});


// Event Handler

fs.readdirSync('./Events/').forEach(file => {
    var jsFiles = fs.readdirSync('./Events/').filter(f => f.split(".").pop() === "js");
    if(jsFiles.length <= 0) return console.log("[Error] - No Events have been Loaded!")
    let check = false;

    jsFiles.forEach(event => {
        const eventGet = require(`./Events/${event}`)

        try {
            Client.events.set(eventGet.name, eventGet)
            if(check == false) {
                console.log(`[Events] - File ${event} was loaded`)
                check = true;
            }
        }catch(error) {
            return console.log(error)
        }
    })
})

// Slash Commands Handler
fs.readdirSync('./SlashCommands/').forEach(dir => {
    fs.readdir(`./SlashCommands/${dir}`, (err, files) => {
        if (err) throw err;

        var jsFiles = files.filter(f => f.split(".").pop() === "js");
        if (jsFiles.length <= 0) {
          console.log("Can't find any commands!");
          return;
        }

        jsFiles.forEach(file => {
            var fileGet = require(`./SlashCommands/${dir}/${file}`);
            console.log(`[Slash Commands] File ${file} was loaded`)
            try {
                Client.slashCmds.set(fileGet.help.name, fileGet);
            } catch (err) {
                return console.log(err);
            }
        });
    });
});


Client.login(Token)