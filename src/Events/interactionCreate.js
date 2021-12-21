const Client = require("../bot").Client;
Client.on('interactionCreate', async interaction => {


    if(interaction.isCommand()) {
        let slashCommands = Client.slashCmds.get(interaction.commandName)
        if(slashCommands) slashCommands.run(interaction)
    }
})